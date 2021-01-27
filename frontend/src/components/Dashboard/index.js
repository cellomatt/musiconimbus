import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as userAlbumsActions from "../../store/userAlbums";

import "./Dashboard.css"

export default function Dashboard({ sessionUser }) {
  const dispatch = useDispatch();

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  const getAlbums = (e) => {
    return dispatch(userAlbumsActions.getUserAlbums(sessionUser.id))
  }

  return (
    <div className="main">
      <h1 >HELLO {sessionUser.firstName}</h1>
      <h3>You haven't uploaded anything yet.</h3>
      <button onClick={getAlbums}>Get Albums</button>
    </div>
  )
}
