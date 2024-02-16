import React from "react";

function FilterPersons({ onSearchText, searchText }) {
  return (
    <div>
      <p>filter shown with</p>
      <input value={searchText} onChange={onSearchText} />
    </div>
  );
}

export default FilterPersons;
