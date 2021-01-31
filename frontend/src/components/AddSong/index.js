import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as songsActions from "../../store/songs";
import "./AddSong.css"

export default function AddSong({ change, setChange, setAddSong, album, buttonClick }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [composerId, setComposerId] = useState('Please select a composer');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [song, setSong] = useState(null);
  const [errors, setErrors] = useState([]);
  const albumId = album.id;

  const {composers, allComposers} = useSelector(state => state.songs)

  useEffect(() => {
    dispatch(songsActions.getComposers())
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    await dispatch(songsActions.createSong({title, albumId, composerId, firstName, lastName, song}))
      .then(() => {
        setTitle('');
        setComposerId('Please select a composer');
        setFirstName('');
        setLastName('');
        setSong(null);
        setAddSong(false);
        setChange((change) => !change);
        buttonClick();
      })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  }

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setSong(file);
  };

  if (allComposers) return (
    <>
      <h3>Add a song to your album</h3>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <p className="form__requirement">* Indicates a required field.</p>
        <label htmlFor="title">
          Song Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="composerId">
          Composer *
        </label>
        <p className="form__label--subheader">If your composer isn't listed, please add them to our database.</p>
        <select
          id="composerId"
          value={composerId}
          onChange={(e) => {
            setComposerId(e.target.value)
            setFirstName('')
            setLastName('')
            }
          }
        >
          <option defaultValue>Please select a composer</option>
          <option></option>
          <option value=''>ADD NEW COMPOSER</option>
          {allComposers.map(composerId =>
            <option value={composerId} key={composerId}>
              {composers[composerId].lastName && `${composers[composerId].lastName}, `}{composers[composerId].firstName}
            </option>
            )
          }
        </select>
        {composerId==="" &&
          <>
            <label htmlFor="firstName">
              First Name *
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
          </>
        }
        <label htmlFor="song">
          Upload Track *
        </label>
        <input
          id="song"
          type="file"
          className="input--song"
          onChange={updateFile}
          required
        />
        <div className="button-container">
          <button type="submit" className="btn btn--secondary">Upload</button>
        </div>
      </form>
    </>
  )
  return (
    <h3>loading...</h3>
  )
}
