import { useEffect, useState } from "react";
import FilterPersons from "./components/FilterPersons";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  // powershell -ExecutionPolicy Bypass -Command "json-server --port=3001 --watch db.json"
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  const onNewName = (e) => {
    setNewName(e.target.value);
  };
  const onNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const onSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddPerson = () => {
    persons.map((person) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        setPersons([...persons]);
      } else {
        setPersons([...persons, { name: newName, number: newNumber }]);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterPersons onSearchText={onSearchText} searchText={searchText} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNewName={onNewName}
        onNewNumber={onNewNumber}
        handleAddPerson={handleAddPerson}
      />
      <h2>Numbers {newName}</h2>
      <Persons persons={persons} searchText={searchText} />
    </div>
  );
};

export default App;
