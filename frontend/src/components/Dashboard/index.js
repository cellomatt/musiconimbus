import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as userAlbumsActions from "../../store/userAlbums";
import AlbumContainer from "../AlbumContainer";
import SongContainer from "../SongContainer";

import "./Dashboard.css"

export default function Dashboard({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userAlbums = useSelector(state => state.userAlbums);
  const userAlbumsArray = Object.values(userAlbums);

  useEffect(() => {
    dispatch(userAlbumsActions.getUserAlbums(sessionUser.id))
  }, [dispatch, sessionUser.id]);


  if (!sessionUser) return (
    <Redirect to="/" />
  );

  const onClick = () => {
    history.push("/albums/new")
  }

  return (
    <div className="main">
      {!userAlbumsArray.length > 0 &&
        <div className="empty-dashboard">
          <h1>Welcome, {sessionUser.firstName}!</h1>
          <h3>You haven't uploaded anything yet.</h3>
          <button className="btn btn--primary" onClick={onClick}>Get Started</button>
        </div>
      }
      {userAlbumsArray.length > 0 &&
        <div className="main__user-assets">
          <div className="title__container">
            <h2 className="title">Your Albums</h2>
            <button className="btn btn--add-music" onClick={onClick}>+ Add Music  </button>
          </div>
          <div className="albums--layout">
            {userAlbumsArray.map(album => {
                return (
                  <AlbumContainer key={album.id} album={album} />
                )
              })
            }
          </div>
          <div className="title__container">
            <h2 className="title">Your Songs</h2>
          </div>
          <div className="songs--layout">
            {userAlbumsArray.map(album => {
              if (album.Songs) {
                const songsArray = Object.values(album.Songs);
                  return songsArray.map(song => {
                    return (
                      <div key={song.id}>
                        <SongContainer song={song} />
                      </div>
                    )
                  })
                }
              return '';
              })
            }
          </div>
        </div>
      }
    </div>
  )
}
