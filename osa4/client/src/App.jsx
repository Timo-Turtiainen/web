import { useState, useEffect, useRef } from "react";
import "./App.css";
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/BlogForm";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isNewBlog, setIsNewBlog] = useState(false);
  const [show, setShow] = useState(false);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      loginService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      loginService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("wrong credentials");
      setIsError(true);
      setTimeout(() => {
        setMessage(null);
        setIsError(false);
      }, 2000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
    window.localStorage.removeItem("loggedUser");
  };

  const addBlogs = (blog) => {
    setBlogs([...blogs, blog]);
    setMessage(`A new blog ${blog.title} ${blog.author} added`);
    setIsNewBlog(true);
    setTimeout(() => {
      setMessage("");
      setIsNewBlog(false);
    }, 2000);
  };

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <h1>Blog App</h1>
      {isError && (
        <div className="error">
          <Notification message={message} />
        </div>
      )}
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          user={user}
        />
      )}
      {user && (
        <p>
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </p>
      )}
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm user={user} addBlogs={addBlogs} />
        <h2>Blogs</h2>
        {isNewBlog && (
          <div className="addedBlog">
            <Notification message={message} />
          </div>
        )}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} show={show} handleShow={handleShow} />
        ))}
      </Togglable>
    </div>
  );
};

export default App;
