// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { play } from "../../store/nowPlaying"
import "./SongContainer.css";

export default function SongContainer({ song }) {
  const dispatch = useDispatch();

  const onClick = (e) => {
    dispatch(play(song));
  }

  return (
      <button onClick={onClick} type="button" className="btn--play-select">
        <div className="song__title--container">
          <i className="fas fa-play"></i>
          <h3 className="song__title">{song.title}</h3>
        </div>
        <p className="composer">{song.Composer.firstName} {song.Composer.lastName}</p>
      </button>
  )
}
