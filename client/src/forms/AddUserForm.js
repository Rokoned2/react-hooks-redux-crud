import React, { useState } from "react";
import { createUser } from "../actions";
import UserForm from "./UserForm";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const AddUserForm = ({ createUser }) => {
  const initialFormState = { id: null, image: "", name: "", username: "" };
  const [user, setUser] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderActions = (
    <Button variant="primary" type="submit">
      Add new user
    </Button>
  );
  const onSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.username || !user.image) return;
    createUser(user);
    setIsSubmitted(true);
    setUser(initialFormState);
  };
  return (
    <UserForm
      renderActions={renderActions}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}
      setIsSubmitted={setIsSubmitted}
      user={user}
      setUser={setUser}
    />
  );
};

export default connect(null, { createUser })(AddUserForm);
