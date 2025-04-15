import React from "react";

import Home from "components/Home";
import CreatePost from "components/Home/Posts/Create";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import routes from "./routes";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={CreatePost} path={routes.posts.create} />
      <Route exact component={Home} path={routes.root} />
    </Switch>
  </Router>
);

export default App;
