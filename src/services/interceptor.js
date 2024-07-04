import axios from 'axios';

const customAxios = axios.create({
});

const onResponse = (response) => response;

const onResponseError = (error) => {
  return Promise.reject(error);
};

customAxios.interceptors.response.use(onResponse, onResponseError);

export default customAxios;
