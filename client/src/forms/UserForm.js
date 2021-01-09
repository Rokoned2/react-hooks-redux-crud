import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FileUpload from "./FileUpload";

const UserForm = ({ renderActions, onSubmit, initialUserImg, isSubmitted, setIsSubmitted, setUser, user}) => {

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const updateImage = (newImage) => {
    setUser({ ...user, image: newImage });
  };

  return (
    <Form className="my-4" onSubmit={onSubmit}>
      <FileUpload
        initialUserImg={initialUserImg}
        refreshFunction={updateImage}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />

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
      {renderActions}
    </Form>
  );
};


export default UserForm;
