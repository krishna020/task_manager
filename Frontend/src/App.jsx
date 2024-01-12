import HomeTodo from "./Pages/HomeTodo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import EditTask from "./Pages/EditTask";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route exact path="/">
            <HomeTodo />
          </Route>
          <Route path="/tasks/:id">
            <EditTask />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
