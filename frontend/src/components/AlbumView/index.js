import { useParams, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as albumsActions from "../../store/albums";
import "./AlbumView.css"

export default function Album({ sessionUser }) {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(albumsActions.getOneAlbum(albumId))
  }, [dispatch, albumId])

  const album = useSelector(state => state.albums.current);


  if (!sessionUser) return (
    <Redirect to="/" />
  );

  if (album) return (
    <div className="main">
      <h1 >{album.title}</h1>
      <h3>{album.artist}</h3>
      <p>{album.description}</p>
      <h3>This is where you'll be able to see all of the information about album {albumId} with all of its songs.</h3>
    </div>
  )

  return (
    <h1>loading...</h1>
  )
}
