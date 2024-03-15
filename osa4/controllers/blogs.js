const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

/* GET all blogs */
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = Blog.findById(request.params.id);
  blog ? response.json(blog) : response.status(404).end();
});

/* POST new blog */
blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: request.user._id,
  });

  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(savedBlog);
});

/* DELETE blog by id */
blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog.user._id.toString() === request.user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);

      response.status(204).end();
    }
  }
);

blogRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  const blog = request.body;
  console.log("SERVER ", blog);
  console.log("SERVER ", request.params.id);

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  console.log("updated blog", updatedBlog);
  response.json(updatedBlog);
});

module.exports = blogRouter;
