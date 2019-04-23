/**
 * @prettier
 * @description: XHR Service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios'
import qs from 'qs'
import Store from './Store'

/**
 * Axios configuration
 * @type {{baseURL: string, contentType: string}}
 */
const config = {
  baseURL: process.env.REACT_APP_API_URL,
  contentType: 'application/x-www-form-urlencoded'
}

/**
 * XHRService class using axios for services
 * @class
 * @public
 */
class XHRService {
  /**
   * XHRService constructor
   */
  constructor() {
    /**
     * Session store
     * @type {Store}
     * @private
     */
    this._store = new Store()

    /**
     * Axios instance
     * @type {AxiosInstance}
     * @private
     */
    this._xhr = axios.create(config)

    // Add request interceptor functions
    this._xhr.interceptors.request.use(this.requestInterceptor, this.interceptorError)
  }

  /**
   * Interceptor function for requests
   * @param config
   * @returns {*}
   */
  requestInterceptor = config => {
    const token = this._store.getItem('token')
    if (token) {
      const { access_token, token_type } = token
      config.headers.common['Authorization'] = `${token_type} ${access_token}`
      console.log('interceptor: adding access token')
    }

    return config
  }

  /**
   * Interceptor function for request errors
   * @param error
   * @returns {Promise<never>}
   */
  interceptorError = error => {
    console.log('Interceptor error', error)
    // Do something with request error
    return Promise.reject(error)
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Set AuthorizationHeader
   * @param {TokenEntity} token - token entity
   * @public
   */
  persistToken(token) {
    this._store.setItem('token', token)
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Remove token from AuthorizationHeader
   * @public
   */
  removePersistedToken() {
    this._store.removeItem('token')
  }

  getPersistedToken() {
    return this._store.getItem('token')
  }

  /**
   * Find entities by query params
   * @param {string} url - resource url to query
   * @param {Object} params - query parameters
   * @returns {Promise<any | never>}
   * @public
   */
  find(url, params) {
    return this._xhr
      .get(url, { params: params })
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(this.errorHandler(error)))
  }

  /**
   * Get an entity
   * @param {string} url - resource url including the resource identifier
   * @returns {Promise<any | never>}
   * @public
   */
  get(url) {
    return this._xhr
      .get(url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(this.errorHandler(error)))
  }

  /**
   * Delete entity
   * @param {string} url - resource url including the resource identifier to be deleted
   * @returns {Promise<any | never>}
   * @public
   */
  delete(url) {
    return this._xhr
      .delete(url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(this.errorHandler(error)))
  }

  /**
   *
   * @param url
   * @param conf
   * @returns {Promise<any | never>}
   */
  head(url, conf = {}) {
    return this._xhr
      .head(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  }

  /**
   *
   * @param url
   * @param conf
   * @returns {Q.Promise<never> | * | Promise<T | never> | *}
   */
  options(url, conf = {}) {
    return this._xhr
      .options(url, conf)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(error))
  }

  /**
   * Create entity
   * @param {string} url - resource url used to create a new entity
   * @param {Object} entity - entity object
   * @returns {Promise<any | never>}
   * @public
   */
  post(url, entity) {
    return this._xhr
      .post(url, qs.stringify(entity))
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(this.errorHandler(error)))
  }

  /**
   * Update entity
   * @param {string} url - resource url including resource identifier to update
   * @param {Object} entity - entity object to be updated
   * @returns {Promise<any | never>}
   * @public
   */
  put(url, entity) {
    return this._xhr
      .put(url, qs.stringify(entity))
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(this.errorHandler(error)))
  }

  /**
   * Update entity
   * @param {string} url - resource url including resource identifier to update
   * @returns {Promise<any | never>}
   */
  patch(url) {
    return this._xhr
      .patch(url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(this.errorHandler(error)))
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
