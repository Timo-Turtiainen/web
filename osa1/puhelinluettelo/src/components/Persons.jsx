import React from "react";

function Persons({ persons, searchText }) {
  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
      person.number.includes(searchText)
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
}

export default Persons;
