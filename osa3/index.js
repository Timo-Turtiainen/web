require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(
    ":date[iso] :method :url :http-version :user-agent :status (:response-time ms) "
  )
); // "combined,common,dev,short,tiny"
app.use(cors());

const Person = require("./models/person");

const PORT = process.env.PORT;

/* Error Handlers */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

/* GET all persons */
app.get("/api/persons", (request, response) => {
  // console.log("Server GET All", data);
  Person.find({}).then((persons) => {
    console.log(persons);
    response.json(persons);
  });
});

app.get("/info", async (request, response) => {
  try {
    // Count the number of persons in the collection
    const count = await Person.countDocuments({});
    const now = new Date();
    response.send(`Phonebook has info for ${count} people\n${now}`);
  } catch (error) {
    console.error("Error counting persons:", error);
    response.status(500).send({ error: "Internal Server Error" });
  }
});

/* GET person by id */
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

/* DELETE person */
app.delete("/api/persons/:id", (request, response, next) => {
  console.log(request.params.id);
  Person.findByIdAndDelete(request.params.id)
    // .then((result) => {
    //   response.status(204).end();
    // })
    .catch((error) => next(error));
});

/* POST  */
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  /* There is no content */
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  /*  */
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
      mongoose.connection.close();
    })
    .catch((error) => next(error)); // pass error
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      console.log(updatedPerson);
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

app.use(errorHandler);

/* Server connection*/
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
