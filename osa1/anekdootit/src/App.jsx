import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleSelected = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVotes = (index) => {
    const copyPoints = [...points];
    copyPoints[index]++;
    setPoints(copyPoints);
  };

  let maxValue = Math.max(...points);
  let maxVotes = points.indexOf(maxValue);

  return (
    <div style={{ flex: 1, margin: 15 }}>
      <div
        style={{
          padding: 15,
        }}
      >
        <div>
          <h1>Päivän anekdootti</h1>
          <p>{anecdotes[selected]}</p>
          <p>on {points[selected]} ääntä</p>
        </div>

        <div style={{ paddingTop: 15 }}>
          <button onClick={() => handleVotes(selected)}>Äänestä</button>
          <button onClick={handleSelected}>seuraava anekdootti</button>
        </div>
        <h1>Eniten ääniä saanut</h1>
        <p>{anecdotes[maxVotes]}</p>
        <p>on {maxValue} ääntä</p>
      </div>
    </div>
  );
};
export default App;
