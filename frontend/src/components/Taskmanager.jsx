import React, { useEffect, useState } from 'react';
import Taskinput from './Taskinput';
import Taskoutput from './Taskoutput';
import axios from 'axios';
import '../css/Taskmanager.css'

const Taskmanager = () => {
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:3000/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const tasksData = Array.isArray(response.data)
        ? response.data
        : JSON.parse(response.data);

      setTasks(tasksData);
    } catch (error) {
      console.log("error fetching tasks:", error.message);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onAddTask = (task) => {
    console.log(task);
    if (!task || !task.text || !task.text.trim()) return;
    setTasks((prev) => [...prev, task]);
  };

  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `http://localhost:3000/tasks/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="taskmanager-container">
      <h2 className="taskmanager-title">Task Manager</h2>
      <div className="taskinput-container">
        <Taskinput addTask={onAddTask} />
      </div>
      <div className="taskoutput-container">
        <Taskoutput tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Taskmanager;
