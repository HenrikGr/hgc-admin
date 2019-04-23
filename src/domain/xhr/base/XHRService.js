/**
 * @prettier
 * @description: XHR Service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios'
import qs from 'qs'

/**
 * Axios configuration
 * @type {{baseURL: string, contentType: string}}
 */
const config = {
  baseURL: process.env.REACT_APP_API_URL,
  contentType: 'application/x-www-form-urlencoded'
}

/**
 * Set baseURL for Axios
 * @type {string | *}
 */
axios.defaults.baseURL = config.baseURL

/**
 * Set default content type header
 * @type {string}
 */
axios.defaults.headers.post['Content-Type'] = config.contentType




/**
 * XHRService class using axios for services
 * @class
 */
class XHRService {
  // noinspection JSMethodCanBeStatic
  /**
   * Set AuthorizationHeader
   * @param {EntityManager} token - token entity
   * @public
   */
  setAuthorizationHeader(token) {
    const { access_token, token_type } = token
    axios.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Remove token from AuthorizationHeader
   * @public
   */
  removeAuthorizationHeader() {
    axios.defaults.headers.common['Authorization'] = ''
  }

  /**
   * Find entities by query params
   * @param {string} url - resource url to query
   * @param {Object} params - query parameters
   * @returns {Promise<any | never>}
   * @public
   */
  find(url, params) {
    return axios
      .get(url, { params: params })
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(this.errorHandler(error))
      })
  }

  /**
   * Get an entity
   * @param {string} url - resource url including the resource identifier
   * @returns {Promise<any | never>}
   * @public
   */
  get(url) {
    return axios
      .get(url)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(this.errorHandler(error))
      })
  }

  /**
   * Create entity
   * @param {string} url - resource url used to create a new entity
   * @param {Object} entity - entity object
   * @returns {Promise<any | never>}
   * @public
   */
  post(url, entity) {
    return axios
      .post(url, qs.stringify(entity))
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(this.errorHandler(error))
      })
  }

  /**
   * Update entity
   * @param {string} url - resource url including resource identifier to update
   * @param {Object} entity - entity object to be updated
   * @returns {Promise<any | never>}
   * @public
   */
  put(url, entity) {
    return axios
      .put(url, qs.stringify(entity))
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(this.errorHandler(error))
      })
  }

  /**
   * Update entity
   * @param {string} url - resource url including resource identifier to update
   * @returns {Promise<any | never>}
   */
  patch(url) {
    return axios
      .patch(url)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(this.errorHandler(error))
      })
  }

  /**
   * Delete entity
   * @param {string} url - resource url including the resource identifier to be deleted
   * @returns {Promise<any | never>}
   * @public
   */
  delete(url) {
    return axios
      .delete(url)
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(this.errorHandler(error))
      })
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Error handler function
   * @param {Object} error - error object
   * @returns {Object} error - an error object
   * @private
   */
  errorHandler(error) {
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
}

export default XHRService
