import React from "react";

function FilterPersons({ onSearchText, searchText }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "21px",
        alignItems: "baseline",
      }}
    >
      <p style={{ margin: "5px" }}>filter shown with</p>
      <input value={searchText} onChange={onSearchText} />
    </div>
  );
}

export default FilterPersons;
