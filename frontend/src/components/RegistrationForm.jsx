import React, { useState } from "react";
import axios from "axios";
import '../css/RegistrationForm.css'

const RegistrationForm = ({ onRegister }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      setSuccess("Registration successful! Please login.");
      setError("");
      if (onRegister) onRegister();
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
      <div className="registrationform-container">
        <h2 className="registrationform-title">Register</h2>
        <form onSubmit={handleSubmit} className="registrationform-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="registrationform-input"
            value={form.fullName}
            onChange={handleChange}
            required
          /> 
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="registrationform-input"
            value={form.email}
            onChange={handleChange}
            required
          /> 
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="registrationform-input"
            value={form.password}
            onChange={handleChange}
            required
          /> 
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="registrationform-input"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          /> 
          <button type="submit" className="registrationform-button">
            Register
          </button>
        </form>
        {error && <p className="registrationform-error">{error}</p>}
        {success && <p className="registrationform-success">{success}</p>}
      </div>
  );
};

export default RegistrationForm;
