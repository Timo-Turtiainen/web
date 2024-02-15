import React from "react";

function Statistics({ average, positive }) {
  return (
    <div>
      <p>Keskiarvo: {average}</p>
      <p>Positiivisia: {positive}</p>
    </div>
  );
}

export default Statistics;
