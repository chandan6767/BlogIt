import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const signup = payload =>
  axios.post(API_ENDPOINTS.USERS, {
    user: payload,
  });

const authApi = {
  signup,
};

export default authApi;
