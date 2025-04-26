import React from "react";

import { Login, Signup } from "components/Authentication";
import { PrivateRoute } from "components/commons";
import Home from "components/Home";
import { CreatePost, ShowPost } from "components/Posts";
import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import queryClient from "utils/queryClient";
import { getFromLocalStorage } from "utils/storage";

import routes from "~/routes";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={ShowPost} path={routes.posts.show} />
          <Route exact component={CreatePost} path={routes.posts.create} />
          <Route exact component={Signup} path={routes.auth.signup} />
          <PrivateRoute
            component={Login}
            condition={!isLoggedIn}
            path={routes.auth.login}
            redirectRoute={routes.root}
          />
          <PrivateRoute
            component={Home}
            condition={isLoggedIn}
            path={routes.root}
            redirectRoute={routes.auth.login}
          />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
