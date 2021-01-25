import "./Home.css";
import logo from "../images/musiconimbus-logo.png";


export default function Home() {
  return (
    <div className="main">
      <h1>Create beautiful music.</h1>
      <h1>Share it with the world.</h1>
      <p>MusicoNimbus is a place for classical musicians to upload, share, and listen to great music.</p>
      <img className="logo" src={logo} alt="clouds logo" />
    </div>
  );
}
