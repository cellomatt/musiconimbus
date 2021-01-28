// import { Link } from "react-router-dom";
import "./SongContainer.css";

export default function SongContainer( {song} ) {

  return (
      <div className="song-container" >
        <i class="fas fa-play"></i>
        <h3 className="">{song.title}</h3>
        <p>{song.Composer.firstName}{song.Composer.lastName}</p>
        {/* <img src={album.imageUrl} className="album__cover"/> */}
      </div>
  )
}
