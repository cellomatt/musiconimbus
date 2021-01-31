import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as albumsActions from "../../store/albums";
import AlbumContainer from "../AlbumContainer";
import "./Explore.css"


export default function Explore({ sessionUser }) {
  const dispatch = useDispatch();
  const albums = useSelector(state => state.albums.all);
  const albumsArray = Object.values(albums);

  useEffect(() => {
    dispatch(albumsActions.getAlbums())
  }, [dispatch]);

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return (
    <div className="main">
      <h1 >Discover new music.</h1>
      <h3>Explore albums from other MusicoNimbus artists.</h3>
      {albumsArray.length > 0 &&
          <div className="albums--layout">
            {albumsArray.map(album => {
                return (
                  <AlbumContainer key={album.id} album={album} />
                )
              })
            }
          </div>
      }
    </div>
  )
}
