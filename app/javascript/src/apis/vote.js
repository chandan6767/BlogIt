import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const create = (slug, payload) =>
  axios.post(`${API_ENDPOINTS.POSTS}/${slug}/vote`, {
    vote: payload,
  });

const votesApi = { create };

export default votesApi;
