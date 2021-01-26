import { useParams } from "react-router-dom";
import "./Album.css"

export default function Album() {
  const { albumId } = useParams();
  return (
    <div className="main">
      <h1 >HELLO!</h1>
      <h3>This is where you'll be able to see all of the information about album {albumId} with all of its songs.</h3>
    </div>
  )
}
