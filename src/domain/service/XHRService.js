/**
 * @prettier
 * @description: XHR Service, using axios
 *
 * The module export a new instance to be reused throughout the application
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Use axios for xhr calls
import axios from 'axios'

// Options for the factory
const options = {
  baseURL: process.env.REACT_APP_API_URL,
  contentType: 'application/x-www-form-urlencoded'
}

/**
 * AXIOS default error handler
 * @param error
 * @returns {*}
 */
export const errorHandler = error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response.data
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    return error.request
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message
  }
}

/**
 * XHR Service factory
 * @constructor
 */
function XHRServiceFactory(options) {
  this.instance = axios.create({ baseURL: options.baseURL })
  this.instance.defaults.headers.post['Content-Type'] = options.contentType

  return {
    getInstance: () => {
      return this.instance
    },
    setAuthorizationHeader: token => {
      const { access_token, token_type } = token
      this.instance.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`
    },
    removeAuthorizationHeader: () => {
      this.instance.defaults.headers.common['Authorization'] = ''
    },
  }
}

// Export an instance of the XHR services
export default new XHRServiceFactory(options)
