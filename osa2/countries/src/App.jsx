import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CountryList from "./components/CountryList";

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);

  let baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

  useEffect(() => {
    // const response = axios.get(`${baseURL}/all`);
    // response
    //   .then((response) => setCountries(response.data))
    //   .catch((error) => {
    //     console.log("ERROR");
    //   });

    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`${baseURL}/all`);
        setCountries(response);
      } catch (error) {
        console.log(`Error fetching data`);
      }
    };
    fetchData();
  }, []);

  const handleClick = (country) => {
    setInput(country);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "baseline",
        margin: "5px",
      }}
    >
      <p>find countries</p>
      <div>
        <input
          type="text"
          placeholder="type country"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <CountryList
          countries={countries}
          input={input}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default App;
