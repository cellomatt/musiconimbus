// import { Link } from "react-router-dom";
import "./SongContainer.css";

export default function SongContainer( {song} ) {

  return (
      // <div className="song__container" >
      <button type="button" className="btn--play-select">
        <div className="song__title--container">
          <i className="fas fa-play"></i>
          <h3 className="song__title">{song.title}</h3>
        </div>
        <p className="composer">{song.Composer.firstName} {song.Composer.lastName}</p>
      </button>
      // </div>
  )
}
