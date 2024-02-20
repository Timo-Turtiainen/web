import React from "react";

function Persons({ persons, searchText, handleDelete, handleUpdatePerson }) {
  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchText.toLowerCase()) ||
      person.number.includes(searchText)
  );
  // console.log(filteredPersons);
  return (
    <div>
      {filteredPersons.map((person) => (
        <p
          key={person.id}
          className="personList"
          onClick={() => handleUpdatePerson(person)}
        >
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
