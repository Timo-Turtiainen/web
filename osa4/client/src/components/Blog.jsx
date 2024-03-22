import { useEffect, useState } from "react";
import blogService from "../services/blogService";

function Blog({ blog, handleLikes, refreshAfterDelete, user }) {
  const [visible, setVisible] = useState(false);
  const [showDelete, setShowDelete] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  
  useEffect(() => {
    if(user) {
      if (user.username === blog.user.username) {
        setShowDelete(true)
      } else {
        setShowDelete(false)
      }
    }
  },[user])

  
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
        <div id='blog'>
          {blog.url}  
          <br></br>
          Likes:{blog.likes} <button onClick={handleLikes} id='likeButton'>Like</button>
        <br></br>
          {blog.user.name}
        </div>
      ) : (
        <div></div>
      )}
      {showDelete ? <button onClick={handleDelete} id='deleteBlogButton'>Delete</button> : <div></div>}
    </div>
  );
}

export default Blog;
