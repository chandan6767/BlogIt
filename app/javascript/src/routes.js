const routes = {
  root: "/",
  posts: {
    create: "/posts/create",
    show: "/posts/:slug/show",
    edit: "/posts/:slug/edit",
    preview: "/posts/preview",
  },
  auth: {
    signup: "/signup",
    login: "/login",
  },
  my: {
    posts: "/my/posts",
  },
};

export default routes;
