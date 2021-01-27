import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
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
          <Route path="/dashboard">
            <Dashboard sessionUser={sessionUser}/>
          </Route>
          <Route path="/explore">
            <Explore sessionUser={sessionUser}/>
          </Route>
          <Route path="/album/:albumId">
            <Album sessionUser={sessionUser}/>
          </Route>
          <Route>
            <div className="main">
              <h1>404'd!</h1>
              <p>The resource you requested does not exist.</p>
            </div>
            {/* update this with something clever later */}
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
