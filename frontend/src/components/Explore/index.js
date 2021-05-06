import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as albumsActions from "../../store/albums";
import AlbumContainer from "../AlbumContainer";
import SearchBar from "../SearchBar"
import "./Explore.css"


export default function Explore({ sessionUser }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");


  useEffect(() => {
    dispatch(albumsActions.getAlbums())
  }, [dispatch]);

  const albums = useSelector(state => state.albums.all);
  let albumsArray = [];

  if (albums) {
    albumsArray = Object.values(albums);
  }

  if (!sessionUser) return (
  <Redirect to="/" />
    );

  if (albumsArray.length > 0) return (
    <div className="main">
      <h1>Discover new music.</h1>
      <SearchBar search={search} setSearch={setSearch}></SearchBar>
          <div className="albums__layout">
            {
              albumsArray
              .filter(album =>
                ((album.User.artistName.toLowerCase().includes(search.toLowerCase())) ||
                (album.title.toLowerCase().includes(search.toLowerCase())) //||
                // (album.Songs.forEach(song => song.Composer.firstName.toLowerCase().includes(search.toLowerCase())))
                )
              )
              .map(album => {

            // {console.log(album.Songs.forEach(song => {console.log(song.Composer.firstName.toLowerCase().includes(search.toLowerCase()))}))}
                return (
                  <AlbumContainer key={album.id} album={album} artist={album.User} />
                )
              })
            }
          </div>
    </div>
  )

  return (
    <h2>loading...</h2>
  )
}
