import { fetch } from "./csrf";

const LOAD_ALBUMS = "userAlbums/LOAD_ALBUMS"


export const loadAlbums = (albums) => {
  return { type: LOAD_ALBUMS, albums };
};


export const getUserAlbums = (userId) => async dispatch => {
  const res = await fetch(`/api/albums/user/${userId}`);
  dispatch(loadAlbums(res.data.albums));
};

const initialState = {};

export default function userAlbumsReducer(state = initialState, action) {
  // const updateState = {...state}
  switch (action.type) {
    case LOAD_ALBUMS: {
      const newAlbums = {};
      action.albums.forEach(album => {
        newAlbums[album.id] = album;
      })
      return {
        ...state,
        ...newAlbums
      }
    }
    // case REMOVE_ALBUM: {
    //   const albums = { ...state };
    //   delete albums[action.itemId];
    //   return albums;
    // }
    // case ADD_ALBUM:
    // case UPDATE_ALBUM: {
    //   return {
    //     ...state,
    //     [action.item.id]: action.item,
    //   };
    // }
    default:
      return state;
  }
}
