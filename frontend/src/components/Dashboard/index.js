import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as userAlbumsActions from "../../store/userAlbums";
import AlbumContainer from "../AlbumContainer";

import "./Dashboard.css"

export default function Dashboard({ sessionUser }) {
  const dispatch = useDispatch();
  const userAlbums = useSelector(state => state.userAlbums);
  const userAlbumsArray = Object.values(userAlbums);

  useEffect(() => {
    dispatch(userAlbumsActions.getUserAlbums(sessionUser.id))
  }, [dispatch, sessionUser.id]);


  if (!sessionUser) return (
    <Redirect to="/" />
  );


  return (
    <div className="main">
      <h1 >HELLO {sessionUser.firstName}</h1>
      {!userAlbums &&
        <div>
          <h3>You haven't uploaded anything yet.</h3>
          <button>Get Started</button>
        </div>
      }
      {userAlbums &&
        <div>
          <h2>Your albums.</h2>
          <div className="albums--layout">
          {userAlbumsArray.map(album => {
            return (
              <AlbumContainer album={album} />
            )
          })}
          </div>
        </div>
      }
      {/* <button onClick={getAlbums}>Get Albums</button> */}
    </div>
  )
}
