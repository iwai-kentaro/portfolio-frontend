import axios, { AxiosRequestConfig } from 'axios';
import { API_V1_BASE_URL } from '../constants/api';

const token = localStorage.getItem('jwt');

export const AXIOS_INSTANCE = axios.create({
  baseURL: API_V1_BASE_URL,
  headers: {
    Authorization: 'Bearer' + token,
  },
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T & { status: number }> => {
  const source = axios.CancelToken.source();
  const promise = AXIOS_INSTANCE.request<T>({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data, status }) => ({ ...data, status }));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};
