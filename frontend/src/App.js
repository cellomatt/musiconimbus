import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import UserProfile from "./components/UserProfile";
import Explore from "./components/Explore";
import Album from "./components/Album";
import AudioPlayer from "./components/AudioPlayer";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/user/:userId">
            <UserProfile sessionUser={sessionUser}/>
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
          <Route path="/album/:albumId">
            <Album />
          </Route>
        </Switch>
      )}
      {sessionUser && (
        <AudioPlayer />
      )}
    </>
  );
}

export default App;
