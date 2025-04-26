import { API_ENDPOINTS } from "constants/axios";

import axios from "axios";

const fetch = () => axios.get(API_ENDPOINTS.ORGANIZATIONS);

const organizationsApi = { fetch };

export default organizationsApi;
