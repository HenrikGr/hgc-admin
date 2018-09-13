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
import qs from 'qs'
import Entity from '../../schemas/entity/Entity'

/**
 * XHRService class
 * @class
 * @constructor
 * @public
 */
export default class XHRService {
  constructor(
    {
      baseURL,
      contentType = 'application/x-www-form-urlencoded',
      validateResponses = true
    },
    schema
  ) {
    this.instance = axios.create({ baseURL })
    this.instance.defaults.headers.post['Content-Type'] = contentType
    this.validateResponses = validateResponses
    if (this.validateResponses) {
      this.schemaService = new Entity(schema)
    }
  }

  /**
   * Schema validator that throws an EntityValidation exception if error
   * @param {object} entity - object of the entity being validated
   * @returns {Error} - throws an EntityValidation exception if error
   * @private
   */
  schemaValidation(entity) {
    return this.schemaService.validate(entity)
  }

  /**
   * Toggle Authorization header
   * @param {object} token - token entity
   * @private
   */
  setHeader(token = {}) {
    const { access_token, token_type } = token
    if (access_token) {
      this.instance.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`
    } else {
      this.instance.defaults.headers.common['Authorization'] = ''
    }
  }

  /**
   * Set AuthorizationHeader
   * @param {object} token - token entity
   * @public
   */
  setAuthorizationHeader(token) {
    this.setHeader(token)
  }

  /**
   * Remove token from AuthorizationHeader
   * @public
   */
  removeAuthorizationHeader() {
    this.setHeader()
  }

  /**
   * Function to find data by params
   * @param {string} url - resource to query
   * @param {object} params - query parameters
   * @returns {Promise<AxiosResponse<any> | never>}
   * @public
   */
  find(url, params) {
    return this.instance
      .get(url, { params: params })
      .then(response => {
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(this.errorHandler(error))
      })
  }

  /**
   * Function to create an entity in a resource
   * The response can be validated if the remote server respond with the created entity
   * and the services has been configure to use entity validation
   * @param {string} url - resource to post a new entity to
   * @param {object} entity - object to be created
   * @returns {Promise<AxiosResponse<any> | never>}
   * @public
   */
  post(url, entity) {
    return this.instance
      .post(url, qs.stringify(entity))
      .then(response => {
        if (this.validateResponses) {
          // Throws an EntityValidation exception if validation error
          this.schemaValidation(response.data)
        }
        return Promise.resolve(response.data)
      })
      .catch(error => {
        // Deal with axios error and EntityValidation exceptions
        return Promise.reject(this.errorHandler(error))
      })

  }

  /**
   * Function to get an entity in a resource
   * @param {string} url - url to a resource + slug
   * @returns {Promise<AxiosResponse<any> | never>}
   * @public
   */
  get(url) {
    return this.instance
      .get(url)
      .then(response => {
        if (this.validateResponses) {
          // Throws an EntityValidation exception if validation error
          this.schemaValidation(response.data)
        }
        return Promise.resolve(response.data)
      })
      .catch(error => {
        // Deal with axios error and EntityValidation exceptions
        return Promise.reject(this.errorHandler(error))
      })
  }

  /**
   * Function to update an entity in a resource
   * The response can be validated if the remote server respond with the created entity
   * and the services has been configure to use entity validation
   * @param {string} url - url to a resource + slug
   * @param {object} entity - object to be updated
   * @returns {Promise<AxiosResponse<any> | never>}
   * @public
   */
  update(url, entity) {
    return this.instance
      .put(url, qs.stringify(entity))
      .then(response => {
        // Throws an EntityValidation exception if validation error
        if (this.validateResponses) {
          this.schemaValidation(response.data)
        }
        return Promise.resolve(response.data)
      })
      .catch(error => {
        return Promise.reject(this.errorHandler(error))
      })
  }

  /**
   * Function to delete an entity in a resource
   * @param {string} url - url to a resource + slug
   * @returns {Promise<AxiosResponse<any> | never>}
   * @public
   */
  delete(url) {
    return this.instance
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
   * @param error
   * @returns {*}
   * @private
   */
  errorHandler(error) {

    /**
     * If schema validation has caught the error
     */
    if (this.validateResponses && error.name === 'Entity validation exception') {
      return error.errors
    }

    /**
     * Process Axios errors
     */
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
