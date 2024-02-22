import React, { useState } from "react";
import Country from "./Country";

function CountryList({ countries, input }) {
  let count = 0;

  // Filter method checks that input and country name matches
  const filteredData = countries.filter((item) => {
    if (item.name.common.toLowerCase().includes(input.toLowerCase())) {
      count++;
      return count <= 250;
    } else false;
  });
  console.log(filteredData.length);
  return (
    <>
      {/* Show component if one match */}
      {filteredData.length === 1 ? (
        <Country filteredData={filteredData[0]} />
      ) : filteredData.length <= 10 ? (
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
