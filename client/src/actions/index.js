import users from '../apis/users';
// import history from '../history';
import {
  CREATE_USER,
  FETCH_USERS,
  FETCH_USER,
  DELETE_USER,
  EDIT_USER
} from './types';


export const fetchUsers = () => async dispatch => {
  const response = await users.get('/users');
  dispatch({ type: FETCH_USERS, payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await users.get(`/users/${id}`);
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const createUser = formValues => async (dispatch) => {
//   const { userId } = getState().auth;
  const response = await users.post('/users', { ...formValues});
// , userId 
  dispatch({ type: CREATE_USER, payload: response.data });
  // history.push('/');
};

export const editUser = (id, formValues) => async dispatch => {
  console.log('formValues de edituser', formValues )
  const response = await users.patch(`/users/${id}`, formValues);
  dispatch({ type: EDIT_USER, payload: response.data });
  // history.push('/');
};

export const deleteUser = id => async dispatch => {
  await users.delete(`/users/${id}`);
  dispatch({ type: DELETE_USER, payload: id });
  // history.push('/');
};
