
import React, { useState } from 'react';
import axios from "axios";
import '../css/Taskinput.css'

const Taskinput = ({ addTask }) => {
  const [Task, setTask] = useState("");

  const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Task.trim()) return;

    try {
      
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API}/submit`,
        { text: Task, completed: false },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      addTask(response.data);
      setTask("");
    } catch (error) {
      console.log(
        "error submitting form:",
        error.response?.data || error.message
      );
    }
  };

  return (
      <div className="taskinput-container">
        <form className="taskinput-form" onSubmit={handleSubmit}>
          <label className="taskinput-label">Enter the task:</label>
          <input
            type="text"
            className="taskinput-input"
            value={Task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="taskinput-button" type="submit">add task</button>
        </form>
      </div>
  );
};

export default Taskinput;
