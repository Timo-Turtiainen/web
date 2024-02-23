const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(
  morgan(
    ":date[iso] :method :url :http-version :user-agent :status (:response-time ms) "
  )
); // "combined,common,dev,short,tiny"

// import data from previous assignment
let data = require("./../osa1/puhelinluettelo/db.json");

const PORT = 3001;

/* GET all persons */
app.get("/api/persons", (request, response) => {
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

/* DELETE person */
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  console.log("id to be deleted:", id);
  console.log("Dataset:", data); // Log the entire data object to see its structure
  data = data.persons.filter((person) => Number(person.id) !== id);
  console.log("Dataset:", data);
  response.status(204).end;
});

/* 3.6: puhelinluettelon backend step6
Tee uuden numeron lisäykseen virheiden käsittely. Pyyntö ei saa onnistua, jos
 -nimi tai numero puuttuu
 - lisättävä nimi on jo luettelossa */
app.post("/api/persons", (request, response) => {
  const person = request.body;
  /* Check if person name is missing */
  if (!person.name) {
    return response
      .status(400)
      .json({ error: "name is missing, please add person name" });
  }
  /* Check if person number is missing */
  if (!person.number) {
    return response
      .status(400)
      .json({ error: "Number is missing, please add person number" });
  }

  /* Find if name already exists  */
  const dublicatePerson = data.persons.find(
    (item) => item.name === person.name
  );
  /* if duplicate person show error message */
  if (dublicatePerson) {
    return response.status(400).json({ error: "Name must be unique" });
  } else {
    response.json(person);
  }
});

/* Server connection*/
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
