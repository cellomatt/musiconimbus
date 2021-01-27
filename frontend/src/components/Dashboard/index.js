import { Redirect } from "react-router-dom";
import "./Dashboard.css"

export default function Dashboard({ sessionUser }) {

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div className="main">
      <h1 >HELLO {sessionUser.firstName}</h1>
      <h3>You haven't uploaded anything yet.</h3>
    </div>
  )
}
