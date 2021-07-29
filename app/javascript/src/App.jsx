import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "./common/logger";
import CreateTask from "components/Tasks/CreateTask";
import ShowTask from "components/Tasks/ShowTask";
import Dashboard from "components/Dashboard";
import { ToastContainer } from "react-toastify";
import EditTask from "components/Tasks/EditTask";
import Signup from "components/Authentication/Signup";
import { either, isEmpty, isNil } from "ramda";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "helpers/storage.js";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    setAuthHeaders(setLoading);
    initializeLogger();
    registerIntercepts();
    logger.info("Never use console.log");
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/tasks/:slug/edit" component={EditTask} />
        <Route exact path="/tasks/:slug/show" component={ShowTask} />
        <PrivateRoute
          exact
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Dashboard}
        />
      </Switch>
    </Router>
  );
};

export default App;