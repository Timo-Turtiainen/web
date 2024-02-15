import { useState } from "react";
import Statistics from "./components/Statistics";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const average = (good - bad) / all;
  const positive = good / all;

  const handleGoodClick = () => {
    setGood((prev) => prev + 1);
    setAll((prev) => prev + 1);
  };

  const handleNeutralClick = () => {
    setNeutral((prev) => prev + 1);
    setAll((prev) => prev + 1);
  };

  const handleBadClick = () => {
    setBad((prev) => prev + 1);
    setAll((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Anna palautetta</h1>
      <div style={{ flexDirection: "row" }}>
        <button style={{ margin: 15 }} onClick={handleGoodClick}>
          Hyvä
        </button>
        <button style={{ margin: 15 }} onClick={handleNeutralClick}>
          Neutraali
        </button>
        <button style={{ margin: 15 }} onClick={handleBadClick}>
          Huono
        </button>
      </div>

      <h1>Statistiikka</h1>
      {/* Show if statistics */}
      {all > 0 ? (
        <div>
          <p>Hyvä: {good}</p>
          <p>Neutraali: {neutral}</p>
          <p>Huono: {bad}</p>
          <p>Kaikki: {all}</p>
          <Statistics average={average} positive={positive} />
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default App;
