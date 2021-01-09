import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../actions';

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const UserTable = ({deleteUser, fetchUsers, users, editRow}) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])

return (
  <Table striped bordered hover className="my-4">
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Username</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.length > 0 ? (
        users.map((user) => (
          <tr key={user.id}>
            <td>
              <Image width={90} src={user.image} />
            </td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td className="d-flex">
              <Button
                variant="primary"
                onClick={() => {
                  editRow(user);
                }}
                className="mr-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteUser(user.id)}
                className="button muted-button"
              >
                Delete
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No users</td>
        </tr>
      )}
    </tbody>
  </Table>
)
};

const mapStateToProps = state => {
  console.log('state.users',state.users)
  return {
    users: Object.values(state.users),
  };
};

export default connect(mapStateToProps, {fetchUsers, deleteUser})(UserTable);
