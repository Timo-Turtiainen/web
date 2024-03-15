import { useState } from "react";

function Blog({ blog }) {
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

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible ? (
        <div>
          {blog.author} <br></br>
          {blog.likes} <button>like</button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Blog;
