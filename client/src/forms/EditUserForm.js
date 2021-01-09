import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { editUser } from "../actions";
import UserForm from "./UserForm";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const renderActions = (
    <>
      <Button variant="primary" type="submit" className="mr-3">
        Update user
      </Button>
      <Button
        variant="danger"
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </Button>
    </>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.username || !user.image) return;
    props.editUser(user.id, user);
    props.setEditing(false);
  };

  return (
    <UserForm
      renderActions={renderActions}
      onSubmit={onSubmit}
      isSubmitted={isSubmitted}
      setIsSubmitted={setIsSubmitted}
      user={user}
      setUser={setUser}
      initialUserImg={user.image}
    />
  );
};

export default connect(null, { editUser })(EditUserForm);
