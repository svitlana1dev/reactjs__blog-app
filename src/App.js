import React from "react";
import { Route, Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Post from "./components/Post/Post";
import Posts from "./pages/Posts/Posts";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route strict exact path="/posts" component={Posts} />
        <Route strict exact path="/signup" component={Signup} />
        <Route strict exact path="/signin" component={Signin} />
        <Route strict exact path="/profile/:id" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
