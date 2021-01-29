import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as albumsActions from "../../store/albums";
import "./AddSong.css"

export default function AddSong({ album, sessionUser }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [song, setSong] = useState(null);
  const [errors, setErrors] = useState([]);
  const albumId = album.id;

  const composerList = useSelector(state => state.albums.composers)
  const composerListArray = Object.values(composerList);

  useEffect(() => {
    dispatch(albumsActions.getComposers())
  }, [dispatch]);



  if (!sessionUser) return (
    <Redirect to="/" />
  );

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setSong(file);
  };

  if (composerList) return (
    <>
      <p>Add a song to your album</p>
      <form>
      <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label htmlFor="title">
          Song Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="composer">
          Composer
        </label>
        <select
          id="composer"
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
        >
          {composerListArray.map(composer =>
            <option value={composer.id}>
              {composer.lastName}, {composer.firstName}
            </option>
            )
          }
        </select>
        <p>If your composer isn't listed, please add them to our database:</p>
        <label htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="song">
          Upload Track
        </label>
        <input
          id="song"
          type="file"
          className="input--song"
          onChange={updateFile}
        />
        <div className="button-container">
          <button type="submit" className="btn btn--primary">Upload</button>
        </div>
      </form>
    </>
  )
  return (
    <h3>loading...</h3>
  )
}
