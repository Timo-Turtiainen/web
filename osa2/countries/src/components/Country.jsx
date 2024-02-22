import React, { useState, useEffect } from "react";
import axios from "axios";
const API_key = import.meta.env.VITE_SOME_KEY;

function Country({ filteredData }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitute] = useState("");
  const [weather, setWeather] = useState([]);

  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLatitude(filteredData.latlng[0]);
        setLongitute(filteredData.latlng[1]);
        const { data: response } = await axios.get(weatherURL);
        console.log(response);
        setWeather(response);
      } catch (error) {
        console.log("Error on fetching weather");
      }
    };
    fetchWeather();
  }, []);

  let list = [];
  for (const item in filteredData.languages) {
    list.push(item);
  }

  const ConvertTemperature = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <div>
      {/* name */}
      <h1>{filteredData.name.common}</h1>
      {/* capital city */}
      <h2>Capital {filteredData.capital}</h2>
      {/* area */}
      <h4>Area: {filteredData.area}</h4>
      {/* population */}
      <h4>Population: {filteredData.population}</h4>
      {/* h4 languages */}
      <h3>languages:</h3>
      {/* List of languages */}
      <ul>
        {list.map((item, index) => {
          return <li key={index}>{filteredData.languages[item]}</li>;
        })}
      </ul>
      <img src={filteredData.flags.png} />

      {weather ? (
        <>
          <h2>Weather in {filteredData.capital}</h2>
          <p>Temperature {ConvertTemperature(weather.main.temp)} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
        </>
      ) : null}
      <p>Wind {weather.wind.speed} m/s </p>
    </div>
  );
}

export default Country;
