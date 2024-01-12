import { useState, useEffect } from "react";
import { BsFillTrashFill } from "@react-icons/all-files/bs/BsFillTrashFill";
import { FcEditImage } from "@react-icons/all-files/fc/FcEditImage";
import InputTask from "./InputTask";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TaskList = ({ title }) => {
  const [tasks, setTasks] = useState([]);

  // Function to get tasks
  const getTasks = () => {
    axios
      .get("https://task-manager-alyconr.1.us-1.fl0.io/api/v1/tasks")
      .then((response) => {
        // Update the tasks state with the fetched data
        setTasks(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to delete tasks
  const deleteTask = (id) => {
    axios
      .delete(`https://task-manager-alyconr.1.us-1.fl0.io/api/v1/tasks/${id}`)
      .then((response) => {
        console.log(response);
        getTasks();
        toast("💥 Task deleted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to delete all tasks
  const deleteAllTasks = () => {
    axios
      .delete("https://task-manager-alyconr.1.us-1.fl0.io/api/v1/tasks")
      .then(() => {
        getTasks();
        toast("💥 All Tasks deleted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Toggle the checkbox when clicked
  const toggleCheckbox = (id, completed) => {
    axios
      .patch(`https://task-manager-alyconr.1.us-1.fl0.io/api/v1/tasks/${id}`, { completed: !completed }, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        getTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Use useEffect to call getTasks when the component mounts
  useEffect(() => {
    getTasks();
  }, []); // The empty dependency array ensures it runs only once on mount

  return (
    <div className="list-container">
      <h1 className="title">
        {title} {""} ({tasks.length})
      </h1>
      <InputTask onGetTasks={getTasks} />
      {tasks.length > 1 && (
        <div className="delete-tasks">
          <button
            className="bn632-hover bn27"
            onClick={deleteAllTasks}
            type="button"
          >
            Delete All Tasks
          </button>
        </div>
      )}
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task" key={task._id}>
            <div className="task-container">
              <div className="checkbox-wrapper-15">
                <input
                  className="inp-cbx"
                  id={`cbx-${task._id}`}
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCheckbox(task._id, task.completed)}
                  style={{
                    display: "none",
                  }}
                />
                <label className="cbx" htmlFor={`cbx-${task._id}`}>
                  <span>
                    <svg width="12px" height="9px" viewBox="0 0 12 9">
                      <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                  </span>
                  <span>{task.name}</span>
                </label>
              </div>
            </div>
            <div className="actions">
              <button onClick={() => deleteTask(task._id)} type="button">
                <BsFillTrashFill className="delete" />
              </button>
              <button type="button">
                <Link
                  to={`/tasks/${task._id}?name=${task.name}`} // Pass task name as a URL parameter
                >
                  <FcEditImage className="edit" />
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
