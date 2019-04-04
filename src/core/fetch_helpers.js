'use strict';

import axios from 'axios';

const success = response => response.data;
const error = (response) => {
  console.error(response);

  throw response;
};

const requestTransformer = (requestData, options) => {
  let transformed = requestData;

  if (options.paramsFormat === 'FORM_DATA') {
    transformed = new FormData();

    Object.keys(requestData).forEach((key) => {
      transformed.set(key, requestData[key]);
    });
  }

  return transformed;
};

const triggeRequest = (method, url, data, options, headers = {}) => (axios({
  method,
  url,
  data,
  transformRequest: [requestData => requestTransformer(requestData, options), ...axios.defaults.transformRequest],
  headers,
})
  .then(success)
  .catch(error)
);

const request = (method, url, data, options = {}) => triggeRequest(method, url, data, options);

async function getAll(urls) {
  const callUrls = [];

  urls.forEach((url) => {
    callUrls.push(axios.get(url));
  });

  const results = await Promise.all(callUrls);

  return results.map(result => result.data);
}

axios.interceptors.request.use((config) => {
  const mockConfig = { ...config };

  return mockConfig;
});

export default {
  getAll,
  get: (url, params, options) => request('GET', url, params, options),
  post: (url, params, options) => request('POST', url, params, options),
  put: (url, params, options) => request('PUT', url, params, options),
  patch: (url, params, options) => request('PATCH', url, params, options),
  delete: (url, params, options) => request('DELETE', url, params, options),
  fetch: (url, method, params, options) => request(method, url, params, options),
};
