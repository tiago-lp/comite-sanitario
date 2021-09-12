import axios from 'axios';
import { getToken } from './auth';

let token;

const handleError = error => {
  console.log(error.response);
};

const requestHandler = config => {
  token = getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
};

const serverUrl = `${process.env.REACT_APP_API_URL}/api/`;

const Api = axios.create({ baseURL: serverUrl });

Api.interceptors.request.use(requestHandler);

Api.interceptors.response.use(
  res => res,
  error => {
    handleError(error);
    return Promise.reject(error);
  }
);

export default Api;
