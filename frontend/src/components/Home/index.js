import "./Home.css";
import logo from "../images/musiconimbus-logo.png";


export default function Home() {
  return (
    <div className="main">
      <h1>Make music.</h1>
      <h1>Share it with the world.</h1>
      <p className="tagline">MusicoNimbus is a place for classical musicians to upload, share, and listen to great music.</p>
      <img className="logo" src={logo} alt="clouds logo" />
      <p className="disclaimer">The music on this website is made available under fair use for educational/demonstration purposes only. <br></br>It is not available for sale or reuse.</p>
    </div>
  );
}
