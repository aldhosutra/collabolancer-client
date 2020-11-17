import React from "react";
import Login from "./component/auth/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./component/landing/home";
import Browse from "./component/app/browse";
import Project from "./component/project/project";

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
        <Route exact={true} path="/app/project/:projectPublicKey">
          <Project />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
