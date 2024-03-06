const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const test_helper = require("./test_helper");

/* Initialize tests to be same everytime  */
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(test_helper.initialBlogs);
});

/* TEST there is same amount blogs */
test("there are two blogs", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, test_helper.initialBlogs.length);
});

/* TEST add new blog */
test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "title for testing",
    author: "test author",
    url: "test url",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await test_helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, test_helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  assert(titles.includes("title for testing"));
});

/* TEST id field is called id not _id */
test("a test that ensures that the identifying field of the returned blogs should be called id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((blog) => {
    assert(blog.id); // Check if id exists and log the result
  });

  assert.strictEqual(response.body.length, test_helper.initialBlogs.length);
});

/* TEST likes are leat 0 */
test("ensure that likes field is given value if not it is set to 0", async () => {
  const blogsAtEnd = await test_helper.blogsInDb(); // fetch all blogs
  for (const blog of blogsAtEnd) {
    if (!blog.likes) {
      const blogToUpdate = {
        ...blog,
        likes: 0,
      };

      // Send a PUT request to update the blog
      await api
        .put(`/api/blogs/${blog.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    }
  }
});

/* TEST POST method expect Bad Request because db schema require title and url */
test("if blog does not contain title or url send 400 Bad Request", async () => {
  const blogWithoutTitle = {
    author: "Timo",
    url: "www.goodjob.com",
    likes: 0,
  };
  const blogWithoutUrl = {
    title: "Learn how to test",
    author: "Timo",
    likes: 0,
  };
  await api
    .post("/api/blogs")
    .send(blogWithoutTitle)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  await api
    .post("/api/blogs")
    .send(blogWithoutUrl)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

/* After everything close database connection */
after(async () => {
  await mongoose.connection.close();
});
