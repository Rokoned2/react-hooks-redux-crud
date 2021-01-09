import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FileUpload from "./FileUpload";
import { connect } from 'react-redux';
import { editUser } from '../actions';

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const updateImage = (newImage) => {
    setUser({ ...user, image: newImage })
}

  return (
    <Form
      className="my-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name || !user.username || !user.image ) return;
        // props.updateUser(user.id, user);
        props.editUser(user.id, user);
        props.setEditing(false);

      }}
    >
      <FileUpload currentUserImg={user.image} refreshFunction={updateImage}/>

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
      <Button variant="primary" type="submit" className="mr-2">
        Update user
      </Button>
      <Button
        variant="danger"
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </Button>
    </Form>
  );
};

export default connect(null, {editUser})(EditUserForm);
