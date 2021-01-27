import "./AlbumContainer.css"

export default function AlbumContainer({ album }) {
  return (
    <div className="container" key={album.id}>
      <h2 className="album__title">{album.title}</h2>
      <img src={album.imageUrl} className="album__cover"/>
      {/* <p>{album.description}</p> */}
    </div>
  )
}
