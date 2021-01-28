// import { Link } from "react-router-dom";
import "./SongContainer.css";

export default function SongContainer( {song} ) {

  return (
      <div className="song__container" >
        <h3 className="song__title">
          <button className="play__select">
            <i className="fas fa-play"></i>
          </button>
          {song.title}
        </h3>
        <p className="composer">{song.Composer.firstName} {song.Composer.lastName}</p>
      </div>
  )
}
