// import { Link } from "react-router-dom";
import "./SongContainer.css";

export default function SongContainer( {song} ) {

  return (
      <div className="song-container" >
        <h3 className="">{song.title}</h3>
        <p>{song.Composer.name}</p>
        {/* <img src={album.imageUrl} className="album__cover"/> */}
      </div>
  )
}
