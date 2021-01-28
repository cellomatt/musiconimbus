import { Link } from "react-router-dom";
import "./AlbumContainer.css"

export default function AlbumContainer({ album }) {
  return (
    <Link to={`/albums/${album.id}`}>
      <div className="container" >
        <h2 className="album__title">{album.title}</h2>
        <h3>{album.releaseDate}</h3>
        <img src={album.imageUrl} alt="album cover" className="album__cover"/>
      </div>
    </Link>
  )
}
