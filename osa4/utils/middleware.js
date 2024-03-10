const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = (request, response, next) => {
  /* 4.22*: blogilistan laajennus, step10
Sekä uuden blogin luonnin että blogin poistamisen yhteydessä on selvitettävä 
operaation tekevän käyttäjän identiteetti. Tätä auttaa jo tehtävässä 4.20 tehty 
middleware tokenExtractor. Tästä huolimatta post- ja delete-käsittelijöissä tulee vielä 
selvittää tokenia vastaava käyttäjä.

Tee nyt uusi middleware userExtractor, joka selvittää pyyntöön liittyvän käyttäjän 
ja sijoittaa sen request-olioon. Eli kun rekisteröit middlewaren ennen routeja tiedostossa app.js  */

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
