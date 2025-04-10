import React from "react";

import Home from "components/Home";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact component={Home} path="/" />
    </Switch>
  </Router>
);

export default App;
