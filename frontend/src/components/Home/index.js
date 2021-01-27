import "./Home.css";
import { ReactComponent as Logo } from "../images/musiconimbus.svg"


export default function Home() {
  return (
    <div className="main">
      <h1>Make music.</h1>
      <h1>Share it with the world.</h1>
      <p className="tagline">MusicoNimbus is a place for classical musicians to upload, share, and listen to great music.</p>
      <Logo className="logo"/>
      <p className="disclaimer">The music on this website is made available under fair use for educational/demonstration purposes only. <br></br>It is not available for sale or reuse.</p>
    </div>
  );
}
