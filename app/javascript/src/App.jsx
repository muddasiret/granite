import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "./common/logger";
import CreateTask from "components/Tasks/CreateTask";
import Dashboard from "components/Dashboard";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setAuthHeaders(setLoading);
    initializeLogger();
    registerIntercepts();
    // logger.info("Never use console.log");
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;