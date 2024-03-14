import React, { useState } from "react";
import blogService from "../services/blogService";

function BlogForm({ user, addBlogs }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleAddBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    const addNewBlog = await blogService.createBlog(newBlog, user.token);
    addBlogs(addNewBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h1>Create new blog</h1>
      <form onSubmit={handleAddBlog}>
        Title
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br></br>
        Author
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br></br>
        URL
        <input value={url} onChange={({ target }) => setUrl(target.value)} />
        <br></br>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default BlogForm;
