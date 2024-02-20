import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([{}]);
  let baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

  useEffect(() => {
    if (input) {
      axios
        .get(`${baseURL}/all`)
        .then((response) => {
          setCountries(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("ERROR");
        });
    }
  }, []);

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

        <h3>{input}</h3>
      </div>
    </div>
  );
}

export default App;
