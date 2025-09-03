import React, { useState } from "react";
import axios from "axios";
import "../css/LoginForm.css"

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();


 if (email.trim() && password.trim()) {
      try {
      
        const response = await axios.post("http://localhost:3000/login", {
          name,
          email,
          password,
        });

        localStorage.setItem("token", response.data.token);

        
        onLogin({ email });

        setError("");
      } catch (err) {
        console.error("Login failed:", err);
        setError("Invalid credentials or server error");
      }
    } else {
      setError("Please enter both email and password");
    }
  };

  return (
      <div className="loginform-container">
        <h2 className="loginform-title">Login</h2>
        <form onSubmit={handleSubmit} className="loginform-form">
          <label className="loginform-label">Enter the email:</label>
          <input
            type="email"
            placeholder="Email"
            className="loginform-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /> 
          <label className="loginform-label">Enter the password:</label>
          <input
            type="password"
            placeholder="Password"
            className="loginform-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> 
          <button
            type="submit"
            className="loginform-button"
          >
            Login
          </button>
        </form>
        {error && <p className="loginform-error">{error}</p>}
      </div>
  );
};

export default LoginForm;
