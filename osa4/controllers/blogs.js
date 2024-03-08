const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/* GET all blogs */
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = Blog.findById(request.params.id);
  blog ? response.json(blog) : response.status(404).end();
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  // const user = await User.findOne();
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  console.log("Blog user id", blog.user._id.toString());
  console.log("Decoded ", decodedToken);
  if (blog.user._id.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  }
});

blogRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogRouter;
