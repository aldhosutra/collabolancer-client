import React from "react";
import Login from "./component/auth/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer autoClose={3000} />
      <Switch>
        <Route path="/auth">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
