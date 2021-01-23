import { fetch } from "./csrf";

export const SET_USER = "session/SET_USER"
export const REMOVE_USER = "session/REMOVE_USER"


export const setUser = (user) => {
  return { type: SET_USER, user };
};

export const removeUser = () => {
  return { type: REMOVE_USER };
};

export const loginUser = (credential, password) => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({credential, password}),
  });
  if (res.ok) {
    dispatch(setUser(res.data.user));
  }
};

export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};

export const logoutUser = () => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(removeUser());
    return res;
  }
};

export const signup = (user) => async dispatch => {
  const { username, email, password } = user;
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  dispatch(setUser(res.data.user));
  return res;
};


const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case SET_USER:
      updateState.user = action.user
      return updateState;
    case REMOVE_USER:
      updateState.user = null;
      return updateState;
    default:
      return state;
    }
}
