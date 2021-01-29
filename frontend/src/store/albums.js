  import { fetch } from "./csrf";

  const LOAD_ALL_ALBUMS = "albums/LOAD_ALL_ALBUMS"
  const LOAD_ONE_ALBUM = "albums/LOAD_ONE_ALBUM"


  export const loadAlbums = (albums) => {
    return { type: LOAD_ALL_ALBUMS, albums };
  };

  export const loadOneAlbum = (data) => {
    return { type: LOAD_ONE_ALBUM, data };
  }


  export const getAlbums = () => async dispatch => {
    const res = await fetch(`/api/albums/`);
    dispatch(loadAlbums(res.data.albums));
  };

  export const getOneAlbum = (albumId) => async dispatch => {
    const res = await fetch(`/api/albums/${albumId}`);
    console.log(res.data)
    dispatch(loadOneAlbum(res.data));
  }


  const initialState = {};

  export default function albumsReducer(state = initialState, action) {
    const updateState = {...state}
    switch (action.type) {
      case LOAD_ALL_ALBUMS: {
        action.albums.forEach(album => {
          updateState[album.id] = album;
        })
        return updateState;
      }
      case LOAD_ONE_ALBUM: {
        updateState.currentAlbum = action.data.album;
        updateState.currentArtist = action.data.artist;
        return updateState;
      }

      default:
        return state;
    }
  }
