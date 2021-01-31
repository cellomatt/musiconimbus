// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { play } from "../../store/nowPlaying"
import { deleteOneSong } from "../../store/songs";
import "./SongContainer.css";

export default function SongContainer({ album, song, sessionUser }) {
  const dispatch = useDispatch();
  const [userSong, setUserSong] = useState(false);

  useEffect(() => {
    if (sessionUser.id === album.artistId) setUserSong(true);
  }, [sessionUser, song])

  const onClick = (e) => {
    dispatch(play(song));
  }

  const deleteSong = (e) => {
    dispatch(deleteOneSong(song.id))
  }

  return (
    <div className="song__container">
      <button onClick={onClick} type="button" className="btn--play-select">
        <div className="song__title--container">
          <i className="fas fa-play"></i>
          <h3 className="song__title">{song.title}</h3>
        </div>
        <p className="composer">{song.Composer.firstName} {song.Composer.lastName}</p>
      </button>
      {userSong && <button type="button" onClick={deleteSong} className="trash-can"><i className="fas fa-trash"></i></button>}
    </div>
  )
}
