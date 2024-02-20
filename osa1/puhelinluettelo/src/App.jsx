import { useEffect, useState } from "react";
import FilterPersons from "./components/FilterPersons";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebookService";
import Notification from "./components/Notification ";
import "./App.css";

const App = () => {
  const errorStyle = "error";
  const addedPersonStyle = "addedPerson";
  const deletePersonStyle = "deletePerson";

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

    if (person) {
      setMessage(`${person.name} is already in phonebook`);
      setStyleType(errorStyle);
      setTimeout(() => {
        setMessage(null);
        setStyleType(null);
      }, 2000);

      // if not in phonebook so added to phonebook
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
      };

      setMessage(`Added ${newPerson.name} to phone book`);
      setStyleType(addedPersonStyle);
      setTimeout(() => {
        setMessage(null);
        setStyleType(null);
      }, 2000);
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

  const handleUpdatePerson = (id, updatePerson) => {
    const person = persons.find((person) => person.id === id);
    const updatedPerson = { ...persons, name: newName, number: newNumber };
    phonebookService.updatePerson(id, updatedPerson);
  };

  const handleDelete = (id) => {
    phonebookService.deletePerson(id);
    const findPerson = persons.find((person) => person.id === id);
    setMessage(`${findPerson.name} deleted successfully`);
    setStyleType(deletePersonStyle);
    setTimeout(() => {
      setMessage(null);
      setStyleType(null);
    }, 2000);
  };

  return (
    <div className="rootContainer">
      <div className="form">
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
    </div>
  );
};

export default App;
