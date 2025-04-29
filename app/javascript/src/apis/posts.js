import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const fetch = (params = {}) => axios.get(API_ENDPOINTS.POSTS, { params });

const show = slug => axios.get(`${API_ENDPOINTS.POSTS}/${slug}`);

const create = payload =>
  axios.post(API_ENDPOINTS.POSTS, {
    post: payload,
  });

const update = (payload, slug) =>
  axios.patch(`${API_ENDPOINTS.POSTS}/${slug}`, { post: payload });

const postsApi = { fetch, create, show, update };

export default postsApi;
