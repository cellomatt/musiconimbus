import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as userAlbumsActions from "../../store/userAlbums";
import "./AddAlbum.css";

export default function AddAlbum() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState([]);
  const artistId = sessionUser.id;

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setReleaseDate(Number(releaseDate));

    let createdAlbum = await dispatch(userAlbumsActions.createAlbum({title, artistId, releaseDate, description, photo}))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
    console.log(createdAlbum)
    if (createdAlbum) {
      history.push(`/albums/${createdAlbum.data.album.id}`);
    }
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  return (
    <div className="main">
      <h1>Add an Album</h1>
      <form className="form__album-create" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label htmlFor="title">
          Album Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="releaseDate">
          Release Date (Year)
        </label>
        <input
          id="releaseDate"
          type="text"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          required
        />
        <label htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="photo">
          Cover Photo
        </label>
        <input
          id="photo"
          type="file"
          className="input--photo"
          onChange={updateFile}
        />
        <div className="button-container">
          <button type="submit" className="btn btn--primary">Create</button>
        </div>
      </form>
    </div>
  )
}
