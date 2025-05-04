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

const destroy = slug => axios.delete(`${API_ENDPOINTS.POSTS}/${slug}`);

const bulkUpdate = ({ slugs, status }) =>
  axios.patch(`${API_ENDPOINTS.POSTS}/bulk_update`, {
    slugs,
    status,
  });

const bulkDestroy = payload =>
  axios.delete(`${API_ENDPOINTS.POSTS}/bulk_destroy`, { data: payload });

const postsApi = {
  fetch,
  create,
  show,
  update,
  destroy,
  bulkUpdate,
  bulkDestroy,
};

export default postsApi;
