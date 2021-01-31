import { useParams, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as albumsActions from "../../store/albums";
import SongContainer from "../SongContainer";
import AddSong from "../AddSong";
import "./AlbumView.css"

export default function Album({ sessionUser }) {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const [userAlbum, setUserAlbum] = useState(false);
  const [addSong, setAddSong] = useState(false);
  const [buttonText, setButtonText] = useState("+ Add a Song");
  const [change, setChange] = useState(false);

  const album = useSelector(state => state.albums.currentAlbum);
  const artist = useSelector(state => state.albums.currentArtist);

  useEffect(() => {
    setUserAlbum(false);
    if (artist) {
      if (artist.id === sessionUser.id) setUserAlbum(true)
    }
  }, [artist, sessionUser]);

  useEffect(() => {
    dispatch(albumsActions.getOneAlbum(albumId))
  }, [dispatch, albumId, change])

  const buttonClick = () => {
    setAddSong(!addSong);
    if (buttonText === "+ Add a Song") { setButtonText("- Add a Song")};
    if (buttonText === "- Add a Song") { setButtonText("+ Add a Song")};
  }

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  if (album) return (
    <div className="main">
      <h1 className="single-album__title">{album.title}</h1>
      {artist && <h3>{artist.artistName}</h3>}
      {album.imageUrl && <img className="single-album__cover" alt="album cover art" src={album.imageUrl} />}
      <p>{album.description}</p>
      {userAlbum &&
        <button id="plus-button" type="button" onClick={buttonClick}>{buttonText}</button>
      }
      {addSong && (
        <>
          <AddSong buttonClick={buttonClick} change={change} setChange={setChange} setAddSong={setAddSong} album={album} />
        </>
      )}
      <div className="song--layout">
        {album && Object.values(album.Songs).map(song => {
          return (
            <div key={song.id}>
              <SongContainer album={album} sessionUser={sessionUser} song={song} change={change} setChange={setChange} />
            </div>
            )
          })
        }
      </div>
    </div>
  )

  return (
    <h1>loading...</h1>
  )
}
