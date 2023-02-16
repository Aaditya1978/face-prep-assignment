import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  // states for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // if user is already logged in, redirect to home page
  useEffect(() => {
    if (user) {
        navigate("/home");
    }
  }, [user, navigate]);


  // handle change in username and password
  const handleChange = (e) => {
    if (e.target.id === "username") {
      setUsername(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    }
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if username and password are not empty
    if (username === "" || password === "") {
      alert("Please enter username and password");
      return;
    }
    // if correct, set user and redirect to home page
    setUser({ username: username });
    navigate("/home");
  };

  return (
    <div className="login">
      {/* heading */}
      <h1 className="loginTitle">Login</h1>

      {/* form */}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter your username..."
          id="username"
          className="loginInput"
          value={username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password..."
          id="password"
          className="loginInput"
          value={password}
          onChange={handleChange}
        />
        <button className="loginButton">Login</button>
      </form>
    </div>
  );
}
