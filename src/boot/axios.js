import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: "https://morning-thicket-92126.herokuapp.com/api/v1",
});

export default boot(({ app }) => {

  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
  
})

const requestHandler = (request) => {
  request.headers.Authorization = localStorage.token;
  return request;
};

const responseHandler = (response) => {
  if (response.status == 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return response;
};


const errorHandler = (error) => {
  if (error.response.status == 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return Promise.reject(error);
};


api.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

api.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);


export { axios, api };
