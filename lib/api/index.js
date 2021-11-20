import request, { headers } from './request';
import * as urlParcelBuilders from './urlParcelBuilders';

export default {
  ...urlParcelBuilders,
  headers,
  get: (url) => request(url, `GET`),
  delete: (url) => request(url, `DELETE`),
  put: (url, data) => request(url, `PUT`, data),
  post: (url, data) => request(url, `POST`, data),
  patch: (url, data) => request(url, `PATCH`, data),
};
