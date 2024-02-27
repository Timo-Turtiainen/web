/*     
"concurrently \"npm run server\" \"npm run client\""
"server": "nodemon server.js",
"client": "cd ../osa1/puhelinluettelo && npm run dev", */

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(
  morgan(
    ":date[iso] :method :url :http-version :user-agent :status (:response-time ms) "
  )
); // "combined,common,dev,short,tiny"
app.use(cors());

app.use(express.static("dist"));

const Person = require("./models/person");
// import data from previous assignment
// let data = require("./../osa1/puhelinluettelo/db.json");

const PORT = process.env.PORT || 3001;

// const generateId = () => {
//   const maxId =
//     data.persons.length > 0 ? Math.max(...data.persons.map((n) => n.id)) : 0;
//   return maxId + 1;
// };

/* GET all persons */
app.get("/api/persons", (request, response) => {
  // console.log("Server GET All", data);
  Person.find({}).then((persons) => {
    response.json(persons);
  });

  response.json(data);
});

/* 3.2 backend step 2 */
app.get("/info", (request, response) => {
  const dataLength = data.persons.length;
  const dateTime = new Date();
  const text = `Phonebook has info for ${dataLength} \npeople ${dateTime}`;
  response.send(text);
});

/* GET person by id */
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
  // const id = Number(request.params.id);
  // // console.log("Requested id:", id);
  // // console.log("Dataset:", data); // Log the entire data object to see its structure
  // let person = data.persons.find((person) => Number(person.id) === id);
  // // console.log("Found person:", person); // Log the person found by the id
  // if (person) {
  //   response.json(person);
  // } else {
  //   console.log("Person not found");
  //   response.status(404).end();
  // }
});

/* DELETE person */
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  // console.log("id to be deleted:", id);
  // console.log("Dataset:", data); // Log the entire data object to see its structure
  data.persons = data.persons.filter((person) => Number(person.id) !== id);
  // console.log("server delete Dataset:", data); // After delete
  response.status(204).end;
});

/* 3.6: puhelinluettelon backend step6
Tee uuden numeron lisäykseen virheiden käsittely. Pyyntö ei saa onnistua, jos
 -nimi tai numero puuttuu
 - lisättävä nimi on jo luettelossa */
app.post("/api/persons", (request, response) => {
  const body = request.body;

  /* There is no content */
  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  /*  */
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  // /* Check if person name is missing */
  // if (!person.name) {
  //   return response
  //     .status(400)
  //     .json({ error: "name is missing, please add person name" });
  // }
  // /* Check if person number is missing */
  // if (!person.number) {
  //   return response
  //     .status(400)
  //     .json({ error: "Number is missing, please add person number" });
  // }

  // /* Find if name already exists  */
  // const dublicatePerson = data.persons.find(
  //   (item) => item.name === person.name
  // );
  // /* if duplicate person show error message */
  // if (dublicatePerson) {
  //   return response.status(400).json({ error: "Name must be unique" });
  // }

  // const newPerson = {
  //   id: generateId(),
  //   name: person.name,
  //   number: person.number,
  // };

  // data.persons.push(newPerson);

  // response.json(newPerson);
});

/* Server connection*/
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
