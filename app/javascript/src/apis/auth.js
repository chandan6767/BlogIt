import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const login = payload =>
  axios.post(API_ENDPOINTS.SESSION, {
    login: payload,
  });

const signup = payload =>
  axios.post(API_ENDPOINTS.USERS, {
    user: payload,
  });

const logout = () => axios.delete(API_ENDPOINTS.SESSION);

const authApi = {
  signup,
  login,
  logout,
};

export default authApi;
