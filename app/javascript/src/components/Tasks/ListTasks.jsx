import React from "react";
import Table from "./Table";

const ListTasks = ({ data, updateTask, showTask, destroyTask }) => {
  return <Table data={data} showTask={showTask} destroyTask={destroyTask} updateTask={updateTask} />;
};

export default ListTasks;