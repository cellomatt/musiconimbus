import { fetch } from "./csrf";

export const ADD_USER = "session/ADD_USER"
export const REMOVE_USER = "session/REMOVE_USER"


export const addUser = (user) => {
  return { type: ADD_USER, user };
};

export const removeUser = (user) => {
  return { type: REMOVE_USER, user };
};

export const loginUser = (credential, password) => async dispatch => {
  const response = await fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({credential, password}),
  });

  if (response.ok) {
    dispatch(addUser(response.data.user));
  }
};


const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case ADD_USER:
      updateState.user = action.user
      return updateState;
    case REMOVE_USER:
      updateState.user = null;
      return updateState;
    default:
      return state;
    }
}
