import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const login = payload =>
  axios.post("/session", {
    login: payload,
  });

const signup = payload =>
  axios.post(API_ENDPOINTS.USERS, {
    user: payload,
  });

const authApi = {
  signup,
  login,
};

export default authApi;
