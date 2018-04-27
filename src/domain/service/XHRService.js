/**
 * Description: Creates a new XHR instance of axios and set up some
 * configuration according to the API.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Use axios for xhr calls
import axios from 'axios';

/**
 * AXIOS default error handler
 * @param error
 * @returns {*}
 */
export const errorHandler = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return error.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message;
  }
};

/**
 * XHR Service factory function
 * @returns {{
 * getInstance: function(): AxiosInstance,
 * setAuthorizationHeader: setAuthorizationHeader,
 * removeAuthorizationHeader: removeAuthorizationHeader
 * }}
 * @constructor
 */
const XHRServiceFactory = () => {

  // Create a new instance of axios and configure the base API url
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  return {
    getInstance: () => {
      return instance;
    },
    setAuthorizationHeader: (token) => {
      const { access_token } = token;
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    },
    removeAuthorizationHeader: () => {
      instance.defaults.headers.common['Authorization'] = '';
    }
  };
};

export default  XHRServiceFactory();
