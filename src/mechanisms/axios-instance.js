import Axios from 'axios';
import ExtendableError from '../utilities/errors/extendable.js';

// eslint-disable-next-line import/prefer-default-export
export function initInstance(baseURL, gateway) {
  const instance = Axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (err) => Promise.reject(new ExtendableError('requestError', {
      gateway,
      message: err.message,
      url: err.config && err.config.url,
      data: err.config && err.config.data,
      method: err.config && err.config.method,
      headers: err.config && err.config.headers,
      status: err.response && err.response.status,
      response: err.response && err.response.data,
    })),
  );

  return instance;
}
