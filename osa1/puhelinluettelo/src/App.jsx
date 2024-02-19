import { useEffect, useState } from "react";
import axios from "axios";
import FilterPersons from "./components/FilterPersons";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebookService";
import Notification from "./components/Notification ";
import "./App.css";

const App = () => {
  // powershell -ExecutionPolicy Bypass -Command "json-server --port=3001 --watch db.json"
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    // const request = axios.get("http://localhost:3001/persons");
    // request.then((response) => {
    //   setPersons(response.data);
    // });
    phonebookService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log("DEBUG: error on geAll method");
      });
  }, [persons]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState(null);
  const [styleType, setStyleType] = useState(null);
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
    const person = persons.find((person) => person.name === newName);
    console.log(person);
    if (person) {
      setMessage(`${person.name} is already in phonebook`);
      setTimeout(() => {
        setMessage(null);
      }, 1000);
      // alert(`${newName} is already added to phonebook`);
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
      };

      phonebookService
        .createPerson(newPerson)
        .then(setPersons([...persons, newPerson]))

        .catch((error) => {
          console.log("DEBUG: error on create method");
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    // const copyPerson = persons.filter((person) => person.id !== id);

    phonebookService.deletePerson(id);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterPersons onSearchText={onSearchText} searchText={searchText} />
      <Notification message={message} styleType={styleType} />
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        onNewName={onNewName}
        onNewNumber={onNewNumber}
        handleAddPerson={handleAddPerson}
      />
      <h2>Numbers {newName}</h2>
      <Persons
        persons={persons}
        searchText={searchText}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
