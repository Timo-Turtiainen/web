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
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState(null);
  const [styleType, setStyleType] = useState(null);

  useEffect(() => {
    phonebookService.getAll((data) => setPersons(data.persons));
    console.log("Inside useEffect() ", persons);
  }, []);

  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchText) ||
      person.number.includes(searchText)
  );

  const handleAddPerson = () => {
    const person = persons.find((person) => person.name === newName);

    /* If there is a person */
    if (person) {
      /* if person is already in phonebook*/
      if (person.name && person.number === newNumber) {
        console.log(`error section`);
        setMessage(`${person.name} is already in phonebook`);
        setStyleType(errorStyle);
        setTimeout(() => {
          setMessage(null);
          setStyleType(null);
        }, 2000);
        /* if person is already in phone book and phone number is differend update number */
      } else if (person.name && person.number !== newNumber) {
        let changedPerson = { ...person, name: newName, number: newNumber };
        phonebookService.updatePerson(person.id, changedPerson);
      }
      /* else person not exist so create person  */
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

      console.log("newPerson before createPerson:", newPerson);
      phonebookService
        .createPerson(newPerson, (person) => setPersons([...persons, person]))

        .catch((error) => {
          console.log("DEBUG: error on createPerson method", error);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewName("");
    setNewNumber("");
  };

  const handleUpdatePerson = (updatePerson) => {
    setNewName(updatePerson.name);
    setNewNumber(updatePerson.number);
  };

  const handleDelete = async (person) => {
    try {
      const personList = persons.filter(
        (character) => character.id !== person.id
      );
      setPersons(personList);
      await phonebookService.deletePerson(person.id);

      setMessage(`${person.name} deleted successfully`);
      setStyleType(deletePersonStyle);
      setTimeout(() => {
        setMessage(null);
        setStyleType(null);
        setNewName("");
        setNewNumber("");
      }, 2000);
    } catch (error) {
      console.log("Error on deleting person", error);
    }
  };

  return (
    <div className="rootContainer">
      <div className="form">
        <h1>Phonebook</h1>
        <FilterPersons
          onSearchText={(e) => setSearchText(e.target.value)}
          searchText={searchText}
        />
        <Notification message={message} styleType={styleType} />
        <PersonForm
          handleSubmit={handleSubmit}
          newName={newName}
          newNumber={newNumber}
          onNewName={(e) => setNewName(e.target.value)}
          onNewNumber={(e) => setNewNumber(e.target.value)}
          handleAddPerson={handleAddPerson}
        />
        <h2>
          Number {newName} {newNumber}
        </h2>
        <Persons
          filteredPersons={filteredPersons}
          handleDelete={handleDelete}
          handleUpdatePerson={handleUpdatePerson}
        />
      </div>
    </div>
  );
};

export default App;
