import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };
  
  

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-heading">Sign Up</h2>

        {error && <p className="signup-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="signup-input"
            required
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?
          <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
