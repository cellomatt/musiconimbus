import "./UserProfile.css"

export default function UserProfile({ sessionUser }) {

  return (
    <div className="main">
      <h1 >HELLO {sessionUser.firstName}</h1>
      <h3>You haven't uploaded anything yet.</h3>
    </div>
  )
}
