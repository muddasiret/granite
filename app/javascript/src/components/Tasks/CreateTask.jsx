import React, { useState, useEffect } from "react";
import Container from "components/Container";
import TaskForm from "./Form/TaskForm";
import PageLoader from "components/PageLoader";
import tasksApi from "apis/tasks";
import usersApi from "apis/users";

const CreateTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      logger.info({  user_id: userId, assigned_user:userName });
      await tasksApi.create({ task: { title, user_id: userId, assigned_user:userName  } });
      setLoading(false);
      history.push("/");
    } 
    catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      setUsers(response.data.users);
      setUserName(response.data.users[0].name);
      setUserId(response.data.users[0].id);
      setPageLoading(false);
    } catch (error) {
      logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <TaskForm
        setTitle={setTitle}
        setUserId={setUserId}
        assignedUser={users[0]}
        setUserName={setUserName}
        loading={loading}
        handleSubmit={handleSubmit}
        users={users}
      />
    </Container>
  );
};

export default CreateTask;