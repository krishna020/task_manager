import { useState } from "react";
import { IoMdAddCircleOutline } from "@react-icons/all-files/io/IoMdAddCircleOutline";
import axios from "axios";
import { toast } from "react-toastify";

const InputTask = ({ onGetTasks }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { name: task }; // Use a different variable name

    axios
      .post(
        "https://task-manager-alyconr.1.us-1.fl0.io/api/v1/tasks",
        newTask,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(() => {
        setTask("");
        onGetTasks();
        toast("✨ Task added Successfully!", {
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

  return (
    <form onSubmit={handleSubmit} className="search-wrapper cf">
      <input
        type="text"
        placeholder="Enter your to-do list task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <button className="btn-input" type="submit">
        <IoMdAddCircleOutline className="icon" />
      </button>
    </form>
  );
};

export default InputTask;
