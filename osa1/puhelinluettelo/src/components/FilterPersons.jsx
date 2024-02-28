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
      <p>filter shown with</p>
      <input value={searchText} onChange={onSearchText} />
    </div>
  );
}

export default FilterPersons;
