import React from "react";

function PersonForm({
  handleSubmit,
  newName,
  onNewName,
  newNumber,
  onNewNumber,
  handleAddPerson,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        name: <input value={newName} onChange={onNewName} />
        number: <input value={newNumber} onChange={onNewNumber} />
      </div>
      <div>
        <button type="submit" onClick={handleAddPerson}>
          add
        </button>
      </div>
    </form>
  );
}

export default PersonForm;
