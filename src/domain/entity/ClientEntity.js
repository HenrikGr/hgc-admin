/**
 * @prettier
 * @description: ClientEntity class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './XHRService'
import JSONValidator from './validator/JSONValidator'

/**
 * Client entity
 * @typedef {Object} Client
 * @property {string} name - client name
 * @property {string} scope - client scope
 * @property {string} grants - client grants
 * @property {string} redirectUris - client redirect uri
 */

/**
 * ClientEntity class
 * @class
 */
class ClientEntity extends XHRService {
  /**
   * ProfileEntity constructor
   * @param {JSON} schema - json entity schema
   * @param {Object} options - constructor options
   * @param {string} options.url - resource url identifier
   */
  constructor(schema, { url = '/api/clients/'} = {}) {
    super()
    /**
     * Client entity validator
     * @type {JSONValidator}
     * @private
     */
    this._validator = new JSONValidator(schema)

    /**
     * Resource url entity identifier
     * @type {string}
     * @property
     * @private
     */
    this._url = url
  }

  /**
   * Get default client
   * @returns {Client}
   */
  getDefaultClient() {
    return this._validator.defaultEntity
  }

  async findClients(params) {
    try {
      return await super.find(this._url, params)
    } catch (err) {
      throw err
    }
  }

  async createClient(client) {
    try {
      let response = await super.post(this._url, client)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async getClient(id) {
    try {
      let response = await super.get(this._url + id)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async updateClient(id, client) {
    try {
      let response = await super.put(this._url + id, client)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async deleteClient(id) {
    try {
      return await super.delete(this._url + id)
    } catch (err) {
      throw err
    }
  }

  async getClientSecret(name) {
    try {
      return await super.get(this._url + 'secret/' + name)
    } catch (err) {
      throw err
    }
  }

  async generateClientSecret(name) {
    try {
      return await super.patch(this._url + 'secret/' + name)
    } catch (err) {
      throw err
    }
  }
}

export default ClientEntity
