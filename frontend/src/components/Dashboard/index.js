import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as userAlbumsActions from "../../store/userAlbums";
import AlbumContainer from "../AlbumContainer";
import SongContainer from "../SongContainer";

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
      <h1 >{sessionUser.firstName}'s Dashboard</h1>
      {!userAlbumsArray.length &&
        <div className="empty-dashboard">
          <h3>You haven't uploaded anything yet.</h3>
          <button className="btn btn--primary">Get Started</button>
        </div>
      }
      {!!userAlbumsArray.length &&
        <div className="main__user-assets">
          <h2>Your Albums</h2>
          <div className="albums--layout">
            {userAlbumsArray.map(album => {
                return (
                  <AlbumContainer key={album.id} album={album} />
                )
              })
            }
          </div>
          <h2>Your Songs</h2>
          <div className="songs--layout">
            {userAlbumsArray.map(album => {
              const songsArray = Object.values(album.Songs);
                return songsArray.map(song => {
                  return (
                    <div>
                      <SongContainer key={song.id} song={song} />
                    </div>
                  )
                })
              })
            }
          </div>
        </div>
      }
      {/* <button onClick={getAlbums}>Get Albums</button> */}
    </div>
  )
}
