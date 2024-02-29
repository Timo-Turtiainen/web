const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
console.log(password);

const url = `mongodb+srv://timoturtiainen:${password}@full-stack-open.emtnnez.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

/* Create Schema */
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

/* Create model */
const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Teemu Selänne",
  number: "050-5556661",
});

person.save().then(() => {
  console.log("not saved!");
});
console.log("after save");
Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
