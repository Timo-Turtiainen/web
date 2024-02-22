import React, { useState } from "react";

function Country({ filteredData }) {
  console.log(filteredData);
  let list = [];
  for (const item in filteredData.languages) {
    list.push(item);
  }

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
    </div>
  );
}

export default Country;
