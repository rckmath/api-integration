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
      url: err.config && err.config.url,
      method: err.config && err.config.method,
      headers: err.config && err.config.headers,
      data: err.config && err.config.data,
      response: err.response && err.response.data,
      status: err.response && err.response.status,
      message: err.message,
    })),
  );

  return instance;
}
