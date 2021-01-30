import { Redirect } from "react-router-dom";
import "./Explore.css"


export default function Explore({ sessionUser }) {
  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div className="main">
      <h1 >Discover new music.</h1>
      <h3>This is where you'll be able to search for albums, songs, and artists.</h3>
    </div>
  )
}
