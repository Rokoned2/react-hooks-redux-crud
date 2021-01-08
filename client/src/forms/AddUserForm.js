import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FileUpload from "./FileUpload";
import { createUser } from "../actions";

import { connect } from "react-redux";

const AddUserForm = ({ createUser }) => {
  const initialFormState = { id: null, image: [], name: "", username: "" };
  const [user, setUser] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const updateImage = (newImage) => {
    console.log("newImage", newImage);
    setUser({ ...user, image: newImage[0] });
  };
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name || !user.username || user.image === undefined) return;
        createUser(user);
        setIsSubmitted(true);
        // props.addUser(user);
        setUser(initialFormState);
      }}
    >
      <FileUpload refreshFunction={updateImage} isSubmitted={isSubmitted} />
      <Form.Group controlId="formGroupName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add new user
      </Button>
    </Form>
  );
};

export default connect(null, { createUser })(AddUserForm);
