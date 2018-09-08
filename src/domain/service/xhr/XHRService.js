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
import axios from 'axios'

class XHRService {
  constructor({baseURL, contentType}) {
    this.instance = axios.create({ baseURL })
    this.instance.defaults.headers.post['Content-Type'] = contentType
  }

  getInstance() {
    return this.instance
  }

  setAccessToken(token) {
    const { access_token } = token
    this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
  }

  removeAccessToken() {
    this.instance.defaults.headers.common['Authorization'] = ''
  }



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
    let result = {
      message: error.response.data.message
    }

    for (let field in error.response.data.errors) {
      result[field] = error.response.data.errors[field]
    }

    return result
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
 * XHR Service factory singleton
 * @constructor
 */
function XHRServiceFactory() {
  let instance = null
  let baseURL = process.env.REACT_APP_API_URL
  let contentType = 'application/x-www-form-urlencoded'

  return {
    getInstance() {
      instance = axios.create({ baseURL })
      instance.defaults.headers.post['Content-Type'] = contentType
      return instance
    },
    setAuthorizationHeader(token) {
      const { access_token } = token
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
    },
    removeAuthorizationHeader() {
      instance.defaults.headers.common['Authorization'] = ''
    }
  }
}

// Export interface
export default new XHRServiceFactory()
