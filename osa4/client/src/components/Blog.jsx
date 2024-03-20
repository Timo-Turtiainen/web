import { useState } from "react";
import blogService from "../services/blogService";

function Blog({ blog, handleLikes, refreshAfterDelete, user }) {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };


  const handleDelete = async () => {
    if (window.confirm("Do you really want to delete?")) {
      refreshAfterDelete(blog);
      await blogService.deleteBlog(blog, user.token);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible ? (
        <div>
          {blog.url}
          <br></br>
          Likes {blog.likes} <button onClick={handleLikes}>like</button>
        <br></br>
          {blog.user.name}
        </div>
      ) : (
        <div></div>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Blog;
