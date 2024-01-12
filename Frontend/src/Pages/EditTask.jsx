import { FcCancel } from "@react-icons/all-files/fc/FcCancel";
import { FcAddImage } from "@react-icons/all-files/fc/FcAddImage";
import { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import useFetch from "../Utils/useFetch";
import axios from "axios";
import { toast } from "react-toastify";

const EditTask = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const {
    data: task,
    loading,
    error,
  } = useFetch(`https://task-manager-alyconr.1.us-1.fl0.io/api/v1/tasks/${id}`);

  const [editTask, setEditTask] = useState({ name: "" });

  // Extract the task name from the URL parameter and set it in the state
  useEffect(() => {
    const taskNameParam = new URLSearchParams(location.search).get("name");
    if (taskNameParam) {
      setEditTask({ name: taskNameParam });
    }
  }, [location.search]);

  const saveTask = () => {
    axios
      .patch(
        `https://task-manager-alyconr.1.us-1.fl0.io/api/v1/tasks/${id}`,
        { name: editTask.name },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then(() => {
        toast("💯 Task Updated Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancelTask = () => {
    history.push("/");
  };

  const handleInputChange = (e) => {
    setEditTask({ name: e.target.value });
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="list-container">
      <h1 className="title">Edit Task</h1>
      <div className="task-list">
        <div className="task">
          <div className="task-container">
            <form onSubmit={saveTask}>
              <input
                type="text"
                className="input-edit"
                placeholder="Edit Task"
                value={editTask.name}
                onChange={handleInputChange}
              />
            </form>
          </div>
          <div className="actions">
            <button onClick={cancelTask} type="button">
              <FcCancel className="delete" />
            </button>
            <button onClick={saveTask} type="button">
              <FcAddImage className="edit" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
