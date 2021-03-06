import React from "react";
import Login from "./component/auth/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./component/landing/home";
import Browse from "./component/app/app";
import BrowseProject from "./component/app/browseProject";
import Project from "./component/project/project";
import BrowseDispute from "./component/app/browseDispute";
import Profile from "./component/profile/profile";
import Directory from "./component/directory/directory";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/auth">
          <Login />
        </Route>
        <Route exact={true} path="/app">
          <Browse />
        </Route>
        <Route exact={true} path="/app/project">
          <BrowseProject />
        </Route>
        <Route exact={true} path="/app/dispute">
          <BrowseDispute />
        </Route>
        <Route exact={true} path="/app/project/:projectPublicKey">
          <Project />
        </Route>
        <Route exact={true} path="/app/profile/:address">
          <Profile />
        </Route>
        <Route exact={true} path="/app/directory">
          <Directory />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
