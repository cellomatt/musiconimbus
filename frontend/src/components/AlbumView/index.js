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
      {artist && <h2 className="album__artist">{artist.artistName}</h2>}
      <div className="album__layout">
        <div className="album__content--left">
          {album.imageUrl && <img className="single-album__cover" alt="album cover art" src={album.imageUrl} />}
          {userAlbum &&
            <button id="plus-button" className="btn btn--tertiary" type="button" onClick={buttonClick}>{buttonText}</button>
          }
        </div>
        <div className="album__content--right">
          <h3 className="album__content--title">Album Description</h3>
          <p className="album__description">{album.description}</p>
          <h3 className="album__content--title">Release Date</h3>
          <p className="album__description">{album.releaseDate}</p>
          <div className="song--layout">
            <h3 className="album__content--title">Songs</h3>
            {album && Object.values(album.Songs).map(song => {
              return (
                <div key={song.id}>
                  <SongContainer album={album} sessionUser={sessionUser} song={song} change={change} setChange={setChange} />
                </div>
                )
              })
            }
          </div>
          <div className="add-song">
            {addSong && (
              <>
                <AddSong buttonClick={buttonClick} change={change} setChange={setChange} setAddSong={setAddSong} album={album} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <h1>loading...</h1>
  )
}
