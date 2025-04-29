const routes = {
  root: "/",
  posts: {
    create: "/posts/create",
    show: "/posts/:slug/show",
    edit: "/posts/:slug/edit",
  },
  auth: {
    signup: "/signup",
    login: "/login",
  },
};

export default routes;
