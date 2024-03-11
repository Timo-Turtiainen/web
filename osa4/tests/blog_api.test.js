const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const test_helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await Blog.insertMany(test_helper.initialBlogs);
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  await user.save();
});

describe("GET methods", () => {
  /* TEST there is same amount blogs */
  test("there are initial amount blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, test_helper.initialBlogs.length);
  });

  /* TEST id field is called id not _id */
  test("a test that ensures that the identifying field of the returned blogs should be called id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      assert(blog.id); // Check if id exists and log the result
    });

    assert.strictEqual(response.body.length, test_helper.initialBlogs.length);
  });
});

describe("POST methods", () => {
  /* TEST add new blog */
  test("a valid blog can be added ", async () => {
    const newBlog = {
      title: "title for testing",
      author: "test author",
      url: "test url",
      likes: 5,
    };

    const token = await test_helper.token();

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("authorization", token)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await test_helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, test_helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    assert(titles.includes("title for testing"));
  });

  /* TEST POST method expect Bad Request because db schema require title and url */
  test("if blog does not contain title or url send 400 Bad Request", async () => {
    const token = await test_helper.token();

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
      .set("authorization", token)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const token2 = await test_helper.token();
    await api
      .post("/api/blogs")
      .send(blogWithoutUrl)
      .set("authorization", token2)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("PUT methods", () => {
  /* TEST likes are least 0 */
  test("ensure that likes field is given value if not it is set to 0", async () => {
    const token = await test_helper.token();
    const blogsAtStart = await test_helper.blogsInDb(); // fetch all blogs
    for (const blog of blogsAtStart) {
      if (!blog.likes) {
        const blogToUpdate = {
          ...blog,
          likes: 0,
        };
        // Send a PUT request to update the blog
        await api
          .put(`/api/blogs/${blog.id}`)
          .send(blogToUpdate)
          .set("authorization", token)
          .expect(200)
          .expect("Content-Type", /application\/json/);
      }
    }
  });

  test("possibility of editing a single blog in the application (likes count)", async () => {
    const blogsAtStart = await test_helper.blogsInDb();
    const selectBlog = blogsAtStart[1];
    selectBlog.likes = 15;
    const token = await test_helper.token();

    const response = await api
      .put(`/api/blogs/${selectBlog.id}`)
      .send(selectBlog)
      .set("authorization", token)
      .expect(200);
    assert.strictEqual(response.body.likes, selectBlog.likes);
  });
});

describe("DELETE methods", () => {
  test("successfully delete one blog", async () => {
    const token = await test_helper.token();
    const blogsAtStart = await test_helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("authorization", token)
      .expect(204);

    const blogsAtEnd = await test_helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, test_helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((item) => item.title);
    assert(!titles.includes(blogToDelete.title));
  });
});

/* After everything close database connection */
after(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});
