import { getConfig, ignoreAuth } from './utils';
import customAxios from './interceptor';

const baseApiUrl =  '';

export const defaultTimeout = 10000;

const axiosBaseQuery =
  (
    { baseUrl }
  ) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await customAxios({
        url: baseUrl + url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        method,
        data,
        params,
        defaultTimeout
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      if (err.response?.status === 401 && !ignoreAuth(err?.request?.responseURL)) {
        localStorage.clear();
        window.location.href = `/login`;
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      };
    }
  };

export { axiosBaseQuery, baseApiUrl };
