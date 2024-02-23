const express = require("express");
const app = express();
app.use(express.json());
// import data from previous assignment
let data = require("./../osa1/puhelinluettelo/db.json");

const PORT = 3001;

// Get all persons
app.get("/api/persons", (request, response) => {
  response.json(data);
});

// 3.2 backend step 2
app.get("/info", (request, response) => {
  const dataLength = data.persons.length;
  const dateTime = new Date();

  const text = `Phonebook has info for ${dataLength} \npeople ${dateTime}`;

  response.send(text);
});

// Get person by id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log("Requested id:", id);
  console.log("Dataset:", data); // Log the entire data object to see its structure
  let person = data.persons.find((person) => Number(person.id) === id);
  console.log("Found person:", person); // Log the person found by the id
  if (person) {
    response.json(person);
  } else {
    console.log("Person not found");
    response.status(404).end();
  }
});

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
