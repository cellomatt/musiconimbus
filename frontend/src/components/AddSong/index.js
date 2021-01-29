import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as songsActions from "../../store/songs";
import "./AddSong.css"

export default function AddSong({ album, sessionUser }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [composerId, setComposerId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [song, setSong] = useState(null);
  const [errors, setErrors] = useState([]);
  const albumId = album.id;

  // const composerList = useSelector(state => state.songs.composers)
  const {composers, allComposers} = useSelector(state => state.songs)
  let composerListArray;

  // if (composerList) {
  //   composerListArray = Object.values(composerList);
  // }

  useEffect(() => {
    dispatch(songsActions.getComposers())
  }, [dispatch]);



  if (!sessionUser) return (
    <Redirect to="/" />
  );


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    let newSong = await dispatch(songsActions.createSong({title, albumId, composerId, firstName, lastName, description, song}))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });

    if (newSong) {
      // history.push(`/albums/${createdAlbum.data.album.id}`);
    }
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setSong(file);
  };

  if (allComposers) return (
    <>
      <p>Add a song to your album</p>
      <form onSubmit={handleSubmit}>
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
        <label htmlFor="composerId">
          Composer
        </label>
        <select
          id="composerId"
          value={composerId}
          onChange={(e) => setComposerId(e.target.value)}
        >
          {allComposers.map(composerId =>
            <option value={composerId} key={composerId}>
              {composers[composerId].lastName && `${composers[composerId].lastName}, `}{composers[composerId].firstName}
            </option>
            )
          }
          {/* <option>Add new </option>  */}
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
          required
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
