import React from "react";

import Signup from "components/Authentication/Signup";
import Home from "components/Home";
import { CreatePost, ShowPost } from "components/Posts";
import { QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import routes from "~/routes";
import queryClient from "~/utils/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={ShowPost} path={routes.posts.show} />
        <Route exact component={CreatePost} path={routes.posts.create} />
        <Route exact component={Home} path={routes.root} />
        <Route exact component={Signup} path={routes.auth.signup} />
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default App;
