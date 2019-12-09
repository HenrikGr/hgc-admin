/**
 * @prettier
 * @description: XHR Service
 * @module XHRService
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import axios from 'axios'
import qs from 'qs'
import Store from './Store'

/**
 * HTTP client configuration
 * @type {{baseURL: string, contentType: string}}
 */
const config = {
  baseURL: process.env.REACT_APP_API_URL,
  contentType: 'application/x-www-form-urlencoded'
}

/**
 * XHRService class using axios HTTP client and
 * does also provide an interface to persist data
 * in sessionStorage and add that data to the HTTP
 * header for every request. A typical use case is
 * to store tokens in the sessionStore and look it
 * up and add it to the HTT headers for requests
 *
 * @example
 * const token = await post.getToken()
 * setStoreItem(token)
 *
 * When consecutive request will be made,
 * the request interceptor function will
 * look it up and add it to the HTTP
 * header,
 *
 * @class
 */
class XHRService {
  constructor() {
    /**
     * Store instance providing an interface to sessionStorage
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

    // Intercept requests before they are handled by then or catch.
    this._xhr.interceptors.request.use(this.requestInterceptorFulfilled, this.requestInterceptorError)
  }

  /**
   * Interceptor function for requests
   * @param config
   * @returns {*}
   */
  requestInterceptorFulfilled = config => {
    const token = this._store.getItem('token')
    if (token) {
      const { access_token, token_type } = token
      config.headers.common['Authorization'] = `${token_type} ${access_token}`
    }

    return config
  }

  /**
   * Interceptor function for request errors
   * @param error
   * @returns {Promise<never>}
   */
  requestInterceptorError = error => {
    // Do something with request error
    return Promise.reject(error)
  }

  /**
   * Persist token in store
   * @param {TokenEntity} entity - token to be persisted
   * @public
   */
  setStoreItem(entity) {
    this._store.setItem('token', entity)
  }

  /**
   * Remove token from store
   * @public
   */
  removeStoreItem() {
    this._store.removeItem('token')
  }

  /**
   * Get persisted token from store
   * @returns {string|any} - the persisted token entity
   * @public
   */
  getStoreItem() {
    return this._store.getItem('token')
  }

  /**
   * Find entities by query params
   * @param {String} url - resource url to query
   * @param {Object} params - query parameters
   * @returns {Promise<TokenEntity[]|ProfileEntity[]|UserEntity[]|ClientEntity[]|any|never>} - a response entity
   * @throws {ValidationException} throws an error on failure
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
   * @param {String} url - resource url including the resource identifier
   * @returns {Promise<TokenEntity|ProfileEntity|UserEntity|ClientEntity|any|never>} - a response entity
   * @throws {ValidationException} throws an error on failure
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
   * @param {String} url - resource url including the resource identifier to be deleted
   * @returns {Promise<any | never>}
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  delete(url) {
    return this._xhr
      .delete(url)
      .then(response => Promise.resolve(response.data))
      .catch(error => Promise.reject(this.errorHandler(error)))
  }

  /**
   * In CORS, a pre-flight request with the OPTIONS method is sent, so that the server can respond
   * whether it is acceptable to send the request with these parameters.
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
   * @param {String} url - resource url used to create a new entity
   * @param {Object} entity - entity object
   * @returns {Promise<TokenEntity|ProfileEntity|UserEntity|ClientEntity|any|never>} - a response entity
   * @throws {ValidationException} throws an error on failure
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
   * @returns {Promise<TokenEntity|ProfileEntity|UserEntity|ClientEntity|any|never>} - a response entity
   * @throws {ValidationException} throws an error on failure
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
   * @param {String} url - resource url including resource identifier to update
   * @param {Object} entity - entity object to be updated
   * @returns {Promise<TokenEntity|ProfileEntity|UserEntity|ClientEntity|any|never>} - a response entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  patch(url, entity) {
    return this._xhr
      .patch(url, entity)
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
