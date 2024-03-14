const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    __v: 0,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "a", author: "a", url: "a", likes: 0 });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};
/* Fetch all blogs from the database */
const blogsInDb = async () => {
  const bloges = await Blog.find({});
  return bloges.map((blog) => blog.toJSON());
};
/* Fetch all user from the database */
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

/* Write code for testing, need to extract user(username,password) and return valid token */
// const token = async (user) => {
//   if (user) {
//     const passwordHash = await bcrypt.hash(user.password, 10);
//     const testUser = new User({
//       username: user.username,
//       name: user.name,
//       passwordHash,
//     });
//     await testUser.save();
//     const result = await api.post("/api/login").send(testUser);
//     const credentials = "Bearer " + result.body.token;

//     return credentials;
//   } else {
//     const passwordHash = await bcrypt.hash("sekret", 10);
//     const testUser = new User({
//       username: "testUser",
//       name: "testUser",
//       passwordHash,
//     });
//     await testUser.save();
//     const result = await api
//       .post("/api/login")
//       .send({ username: username, name: name, password: passwordHash });
//     const credentials = "Bearer " + result.body.token;

//     return credentials;
//   }
// };

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  token,
};
