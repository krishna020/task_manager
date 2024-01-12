import TaskList from "../Components/TaskList";
import useFetch from "../Utils/useFetch";

const HomeTodo = () => {

    const { data: tasks, loading, error } = useFetch("https://task-manager-alyconr.1.us-1.fl0.io/api/v1/tasks");

return (
<div className="TaskList">
 {error && <div className="error"> {error} </div>}
 {loading ? (
    <div className="spinner-container">
          <div className="loading-spinner" />
        </div>
      ) : (
        <TaskList tasks={tasks} title="TASKS TO-DO" />
      )}
</div>

);


};

export default HomeTodo;