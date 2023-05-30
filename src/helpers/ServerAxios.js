import axios from 'axios';
import config from '../config';

let store;
const axiosInstance = axios.create({ baseURL: config.baseUrl, timeout: 10000 });

axiosInstance.interceptors.request.use((request) => {
  const { user } = store.getState().auth;
  if (user) { request.headers.authorization = user.token; }
  return request;
});

export const injectStore = (_store) => store = _store;
export default axiosInstance;
