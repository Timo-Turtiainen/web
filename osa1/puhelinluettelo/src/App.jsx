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

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState(null);
  const [styleType, setStyleType] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    phonebookService.getAll((data) => setPersons(data));
  }, []);

  /* Filter array of persons based on input field */
  const filteredPersons = persons.filter((person) => {
    return (
      person.name.toLowerCase().includes(searchText) ||
      person.number.includes(searchText)
    );
  });

  const handleAddPerson = async () => {
    /* Check if person is on array of persons*/
    const person = persons.find((person) => person.name === newName);

    /* If there is a person */
    if (person) {
      /* if person is already in phonebook*/
      if (person.name && person.number === newNumber) {
        setMessage(`${person.name} is already in phonebook`);
        setStyleType(errorStyle);
        setTimeout(() => {
          setMessage(null);
          setStyleType(null);
        }, 2000);
        /* if person is already in phone book and phone number is differend => update number */
      } else if (person.name && person.number !== newNumber) {
        let changedPerson = { ...person, number: newNumber };
        let updatedPerson = await phonebookService.updatePerson(
          person.id,
          changedPerson
        );
        /* setPersons after updating  */
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        );
        setMessage(`Updated ${updatedPerson.name} number on phone book`);
        setStyleType(addedPersonStyle);
        setTimeout(() => {
          setMessage(null);
          setStyleType(null);
        }, 2000);
      }

      /* else person is not in array of persons  */
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
      };

      phonebookService.createPerson(
        newPerson,
        (person) => {
          setPersons([...persons, person]);
          setIsError(false);
        },
        (error) => {
          // set the error message
          setMessage(error.response.data.error);
          setStyleType(errorStyle);
          setTimeout(() => {
            setMessage(null);
            setStyleType(null);
          }, 2000);
          setIsError(true);
        }
      );

      if (!isError) {
        setMessage(`Added ${newPerson.name} to phone book`);
        setStyleType(addedPersonStyle);
        setTimeout(() => {
          setMessage(null);
          setStyleType(null);
        }, 2000);
      }
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

  const handleDelete = (person) => {
    const personList = persons.filter(
      (character) => character.id !== person.id
    );
    setPersons(personList);
    phonebookService.deletePerson(person.id);

    setMessage(`${person.name} deleted successfully`);
    setStyleType(deletePersonStyle);
    setTimeout(() => {
      setMessage(null);
      setStyleType(null);
      setNewName("");
      setNewNumber("");
    }, 2000);
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
