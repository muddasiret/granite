import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "./common/logger";
import CreateTask from "components/Tasks/CreateTask";
import ShowTask from "components/Tasks/ShowTask";
import Dashboard from "components/Dashboard";
import { ToastContainer } from "react-toastify";
import EditTask from "components/Tasks/EditTask";

const App = () => {
  const [loading, setLoading] = useState(true);
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
        <Route exact path="/tasks/:slug/edit" component={EditTask} />
        <Route exact path="/tasks/:slug/show" component={ShowTask} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;