import { useParams, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as albumsActions from "../../store/albums";
import SongContainer from "../SongContainer";
import "./AlbumView.css"

export default function Album({ sessionUser }) {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const [userAlbum, setUserAlbum] = useState(false);
  const album = useSelector(state => state.albums.currentAlbum);
  const artist = useSelector(state => state.albums.currentArtist);

  useEffect(() => {
    if (artist) {
      if (artist.id === sessionUser.id) setUserAlbum(true)
    }

  }, [artist, sessionUser]);

  useEffect(() => {
    dispatch(albumsActions.getOneAlbum(albumId))
  }, [dispatch, albumId])



  if (!sessionUser) return (
    <Redirect to="/" />
  );



  if (album) return (
    <div className="main">
      <h1 >{album.title}</h1>
      {artist && <h3>{artist.artistName}</h3>}
      {album.imageUrl && <img className="single-album__cover" alt="album cover art" src={album.imageUrl} />}
      <p>{album.description}</p>
      {userAlbum && (
        <h1>this is my album!!</h1>
      )}
      <div className="song--layout">
        {album && Object.values(album.Songs).map(song => {
          return (
            <div key={song.id}>
              <SongContainer song={song} />
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
