import React, { useState } from "react";
import Country from "./Country";

function CountryList({ countries, input }) {
  let count = 0;

  const filteredData = countries.filter((item) => {
    if (item.name.common.toLowerCase().includes(input.toLowerCase())) {
      count++;
      return count <= 250;
    } else false;
  });
  console.log(filteredData.length);
  return (
    <>
      {filteredData.length <= 10 ? (
        <div>
          {filteredData.map((item) => {
            return <h2 key={item.name.official}>{item.name.common}</h2>;
          })}
        </div>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </>
  );
}

export default CountryList;
