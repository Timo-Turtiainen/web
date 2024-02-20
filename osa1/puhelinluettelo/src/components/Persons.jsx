import React from "react";

function Persons({ persons, searchText, handleDelete }) {
  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
      person.number.includes(searchText)
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id} className="personList">
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)} className="button">
            Delete
          </button>
        </p>
      ))}
    </div>
  );
}

export default Persons;
