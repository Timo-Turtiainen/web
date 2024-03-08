const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const helper = require("./test_helper");

const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("root", 10);
  const user = new User({
    username: "root",
    name: "root",
    passwordHash,
    // blogs: ["5a422a851b54a676234d17f7", "5a422aa71b54a676234d17f8"],
  });

  await user.save();
});

describe("POST methods", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "akan",
      name: "Aku Ankka",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });

  // test("creation fails with proper statuscode and message if username already taken", async () => {
  //   const usersAtStart = await helper.usersInDb();

  //   const newUser = {
  //     username: "root",
  //     name: "Superuser",
  //     password: "salainen",
  //   };

  //   const result = await api
  //     .post("/api/users")
  //     .send(newUser)
  //     .expect(400)
  //     .expect("Content-Type", /application\/json/);

  //   const usersAtEnd = await helper.usersInDb();

  //   assert(result.body.error.includes("expected `username` to be unique"));
  //   assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  // });

  // test("creation fails with proper statuscode and message if username is too short", async () => {
  //   const usersAtStart = await helper.usersInDb();

  //   const newUser = {
  //     username: "RP",
  //     name: "Roope Ankka",
  //     password: "supersalainen",
  //   };

  //   const result = await api
  //     .post("/api/users")
  //     .send(newUser)
  //     .expect(400)
  //     .expect("Content-Type", /application\/json/);

  //   const usersAtEnd = await helper.usersInDb();

  //   assert(
  //     result.error.text.includes(
  //       "username: Path `username` (`RP`) is shorter than the minimum allowed length (3)."
  //     )
  //   );
  //   assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  // });

  // test("creation fails with proper statuscode and message if password is too short", async () => {
  //   const usersAtStart = await helper.usersInDb();

  //   const newUser = {
  //     username: "HHanhi",
  //     name: "Hannu Hanhi",
  //     password: "hh",
  //   };

  //   const result = await api
  //     .post("/api/users")
  //     .send(newUser)
  //     .expect(400)
  //     .expect("Content-Type", /application\/json/);

  //   const usersAtEnd = await helper.usersInDb();

  //   assert(
  //     result.error.text.includes(
  //       "password has to be at least 3 characters long"
  //     )
  //   );
  //   assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  // });
});

describe("GET methods", () => {
  test("Get users", async () => {
    const usersAtStart = await helper.usersInDb();
    console.log(usersAtStart);
  });
});
after(async () => {
  // await User.deleteMany({});
  await mongoose.connection.close();
});
