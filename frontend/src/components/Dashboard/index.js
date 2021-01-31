import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as userAlbumsActions from "../../store/userAlbums";
import AlbumContainer from "../AlbumContainer";
import SongContainer from "../SongContainer";

import "./Dashboard.css"

export default function Dashboard({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [change, setChange] = useState(false);
  const userAlbums = useSelector(state => state.userAlbums);
  const userAlbumsArray = Object.values(userAlbums);

  useEffect(() => {
    dispatch(userAlbumsActions.getUserAlbums(sessionUser.id))
  }, [dispatch, sessionUser.id, change]);


  if (!sessionUser) return (
    <Redirect to="/" />
  );

  const onClick = () => {
    history.push("/albums/new")
  }

  return (
    <div className="main">
      {!userAlbumsArray.length > 0 &&
        <div className="empty-dashboard vertical-center">
          <h1>Welcome, {sessionUser.firstName}!</h1>
          <h3>You haven't uploaded anything yet.</h3>
          <button className="btn btn--secondary get-started" onClick={onClick}>Get Started</button>
        </div>
      }
      {userAlbumsArray.length > 0 &&
        <div className="main__user-assets">
          <div className="title__container">
            <h2 className="title">Your Albums</h2>
            <button className="btn btn--secondary" onClick={onClick}>+ Add Album</button>
          </div>
          <div className="albums--layout">
            {userAlbumsArray.map(album => {
                return (
                  <AlbumContainer key={album.id} album={album} />
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}
