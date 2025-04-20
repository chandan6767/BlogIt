import axios from "axios";

const fetch = categoryIds => {
  const params = categoryIds?.length ? { category_ids: categoryIds } : {};

  return axios.get("/posts", { params });
};

const show = slug => axios.get(`/posts/${slug}`);

const create = payload =>
  axios.post("/posts", {
    post: payload,
  });

const postsApi = { fetch, create, show };

export default postsApi;
