/**
 * @prettier
 * @description: Client API services
 *
 * All api calls return a promise, either resolved or rejected which means
 * it can be used in async / await or other promise based functions.
 *
 * The error handler is a default axios error handler with no modifications.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import qs from 'qs'
import XHRService, { errorHandler } from './XHRService'

/**
 * XHR instance
 * @private
 */
const XHR = XHRService.getInstance()

/**
 * Create client
 * @param {object} client - client entity
 * @returns {Promise<AxiosResponse<any>>}
 * @public
 */
function create(client) {
  return XHR.post('/api/clients', qs.stringify(client))
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(errorHandler(error))
    })
}

/**
 * Get clients
 * Support for param queries such as;
 * - conditions (filtering),
 * - pagination, using page as query param,
 * - limit, defining number of items returned,
 * - sorting,
 * - projection,
 * - etc...
 * @param {object} params - query params
 * @returns {Promise<AxiosResponse<any>>}
 * @public
 */
function findByQuery(params) {
  return XHR.get('/api/clients', { params: params })
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(errorHandler(error))
    })
}

/**
 * Update client by id
 * @param {string} id - id key for a client
 * @param {object} client - client entity
 * @returns {Promise<AxiosResponse<any>>}
 * @public
 */
function updateById(id, client) {
  return XHR.put('/api/clients/' + id, qs.stringify(client))
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(errorHandler(error))
    })
}

/**
 * Delete client by id
 * @param {string} id - id key for a client
 * @returns {Promise<AxiosResponse<any>>}
 * @public
 */
function deleteById(id) {
  return XHR.delete('/api/clients/' + id)
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(errorHandler(error))
    })
}

/**
 * Find secrets by client name
 * @param {string} name - name of client
 * @returns {*|Promise<T | never>}
 */
function findSecretsByName(name) {
  return XHR.get('/api/clients/secret/' + name)
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(errorHandler(error))
    })
}

/**
 * Generate secret by name
 * @param {string} name - name of client
 * @returns {Promise<any | never>}
 */
function generateSecretsByName(name) {
  return XHR.patch('/api/clients/secret/' + name)
    .then(response => {
      return Promise.resolve(response.data)
    })
    .catch(error => {
      return Promise.reject(errorHandler(error))
    })
}

/**
 * Interface constructor for the client api service
 * @constructor
 * @public
 */
function ClientAPIFactory() {
  return {
    create,
    findByQuery,
    updateById,
    deleteById,
    findSecretsByName,
    generateSecretsByName
  }
}

export default new ClientAPIFactory()
