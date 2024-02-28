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

app.use(errorHandler);
app.use(unknownEndpoint);

/* GET all persons */
app.get("/api/persons", (request, response) => {
  // console.log("Server GET All", data);
  Person.find({}).then((persons) => {
    console.log(persons);
    response.json(persons);
  });
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

  mongoose.connection.close();
});

/* DELETE person */
app.delete("/api/persons/:id", (request, response, next) => {
  console.log(request.params.id);
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
  response.status(204).end;
});

/* 3.6: puhelinluettelon backend step6
Tee uuden numeron lisäykseen virheiden käsittely. Pyyntö ei saa onnistua, jos
 -nimi tai numero puuttuu
 - lisättävä nimi on jo luettelossa */
app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log("body content", body.name + " " + body.number);

  /* There is no content */
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  /*  */
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  console.log("Server POST method", person);
  person.save().then((savedPerson) => {
    response.json(savedPerson);
    mongoose.connection.close();
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

/* Server connection*/
app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
