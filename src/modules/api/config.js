/**
 * Description: Configuration module for XHR API
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

// Use axios for xhr calls
import axios from "axios";

// Create a new instance of axios
let XHR = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Set axios global defaults
//XHR.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//XHR.defaults.headers.common['Authorization'] = AUTH_TOKEN;

/**
 * Error handler for axios
 * @param error
 * @returns {*}
 */
export function errorHandler(error) {
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
}

export default XHR;
