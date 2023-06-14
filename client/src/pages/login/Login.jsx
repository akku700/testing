/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import newRequest from "../../utils/newRequest";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      toast.success("Login Successful", {
        position: "bottom-left",
        autoClose: 1000,
        theme: "dark",
      });
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "bottom-left",
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
      <p className="signup-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      <p className="signup-link">
        Don't Remember password then Forget password?
        <Link to="/Forget">ForgetPassword</Link>
      </p>
    </div>
  );
};

export default Login;
