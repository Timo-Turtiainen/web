import React from "react";

function Persons({ filteredPersons, handleDelete, handleUpdatePerson }) {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p
          key={person.id}
          className="personList"
          onClick={() => handleUpdatePerson(person)}
        >
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)} className="button">
            Delete
          </button>
        </p>
      ))}
    </div>
  );
}

export default Persons;
