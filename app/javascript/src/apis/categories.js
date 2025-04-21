import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const fetch = () => axios.get(API_ENDPOINTS.CATEGORIES);

const create = payload =>
  axios.post(API_ENDPOINTS.CATEGORIES, { category: payload });

const categoriesApi = { fetch, create };

export default categoriesApi;
