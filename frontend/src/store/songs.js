import { fetch } from "./csrf";

const LOAD_ALL_SONGS = "songs/LOAD_ALL_SONGS"
const LOAD_ONE_SONG = "songs/LOAD_ONE_SONG"
const LOAD_ALL_COMPOSERS = "songs/LOAD_ALL_COMPOSERS"
const ADD_SONG = "songs/ADD_SONG"


export const loadSongs = (songs) => {
  return { type: LOAD_ALL_SONGS, songs };
};

export const loadOneSong = (data) => {
  return { type: LOAD_ONE_SONG, data };
}

export const loadComposers = (composers) => {
  return { type: LOAD_ALL_COMPOSERS, composers };
}

export const addSong = (song) => {
  return { type: ADD_SONG, song };
}

export const getSongs = () => async dispatch => {
  const res = await fetch(`/api/songs/`);
  dispatch(loadSongs(res.data.songs));
};

export const getOneSong = (songId) => async dispatch => {
  const res = await fetch(`/api/songs/${songId}`);

  dispatch(loadOneSong(res.data));
}

export const createSong = (newSong) => async dispatch => {
  const { title, albumId, composerId, firstName, lastName, description, song } = newSong;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("albumId", albumId);
  if (composerId.length) formData.append("composerId", composerId);
  if (firstName.length) formData.append("firstName", firstName);
  if (lastName.length) formData.append("lastName", lastName);
  formData.append("description", description);
  formData.append("song", song);

  const res = await fetch(`/api/songs/new`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData,
  });

  dispatch(addSong(res.data.song))
  return res;
}


export const getComposers = () => async dispatch => {
  const res = await fetch(`/api/composers/`);
  dispatch(loadComposers(res.data.composers))
}




const initialState = { allComposers: [], composers: {} };

export default function songsReducer(state = initialState, action) {
  const updateState = {...state}
  switch (action.type) {
    case LOAD_ALL_SONGS: {
      action.songs.forEach(song => {
        updateState[song.id] = song;
      })
      return updateState;
    }
    case LOAD_ONE_SONG: {
      updateState.current = action.data.song;
      return updateState;
    }
    case LOAD_ALL_COMPOSERS: {
      updateState.allComposers = [];
      action.composers.forEach(composer => {
        updateState.composers[composer.id] = composer;
        updateState.allComposers.push(composer.id);
      })
      return updateState;
    }
    case ADD_SONG: {
      updateState[action.song.id] = action.song;
      return updateState;
    }
    default:
      return state;
  }
}
