import React, { useState } from "react";
import blogService from "../services/blogService";

function BlogForm({ handleAddBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={ () => handleAddBlog({title, author, url})}>
        <label htmlFor="title">Title</label>
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          id="title"
        />
        <br></br>
        <label htmlFor="author">Author</label>
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          className="author"
          id="author"
        />
        <br></br>
        <label htmlFor="url">Url</label>
        <input value={url} onChange={({ target }) => setUrl(target.value)} className="url" id="url" />
        <br></br>
        <button type="submit">Save</button>
        
      </form>
    </>
  );
}

export default BlogForm;
