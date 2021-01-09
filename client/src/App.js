import React, { useState, Fragment } from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";
import UserTable from "./tables/UserTable";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const App = () => {

  const initialFormState = { id: null, image: '', name: "", username: "" };

  // Setting state
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({ id: user.id, name: user.name, username: user.username, image: user.image});
  };

  return (
    <Container className="my-5">
      <h1>CRUD App with Hooks and Redux</h1>
      <Row>
        <Col sm className="my-5">
          {editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                className="my-3"
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
              />
            </Fragment>
          ) : (
            <Fragment>
              <h2>Add user</h2>
              <AddUserForm  />
            </Fragment>
          )}
        </Col>

        <Col sm className="my-5">
          <h2>View users</h2>
          <UserTable editRow={editRow} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
