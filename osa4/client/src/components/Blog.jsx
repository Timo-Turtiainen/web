import { useState } from "react";
import blogService from "../services/blogService";

function Blog({ blog, refreshLikeCount, user }) {
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

  const handleLikes = async () => {
    const updateLikeCount = { ...blog, likes: blog.likes + 1 };
    const updateBlog = await blogService.updateBlog(
      updateLikeCount,
      user.token
    );
    // refreshLikeCount(updateBlog);
  };

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible ? (
        <div>
          {blog.author} <br></br>
          Likes {blog.likes} <button onClick={handleLikes}>like</button>
          <br></br>
          {user.name}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Blog;
