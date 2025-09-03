import React from 'react'

const Taskoutput = ({tasks, onToggle, onDelete}) => {
     console.log("TASKS RECEIVED IN TaskOutput:", tasks);

  if (!Array.isArray(tasks)) {
    return <p className="text-red-500"> Error: Invalid tasks prop.</p>;
  }

  return (
    <div>
      <h2 className="taskoutput-title">Your list of tasks to be done!!</h2>
      {tasks.length === 0 ? (
        <p className="taskoutput-empty">No tasks added yet</p>
      ) : (
        <ul>
          {tasks.map((item) => (
            <li
              key={item._id}
              className={`task-item${item.completed ? ' completed' : ''}`}
            >
              <span>
                {item.text}
              </span>
              <div>
                <button
                  className="toggle-btn"
                  type="button"
                  onClick={() => onToggle(item._id)}
                >
                  add
                </button>
                <button
                  className="delete-btn"
                  type="button"
                  onClick={() => onDelete(item._id)}
                >
                  delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default Taskoutput
