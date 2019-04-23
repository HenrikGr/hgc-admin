/**
 * @prettier
 * @description: ClientAPI Service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ClientValidator } from '../entity/validator'
import XHRService from './base/XHRService'

/**
 * ClientAPI
 * @augments XHRService
 */
class ClientAPI extends XHRService {
  /**
   * Constructor
   * @param {JSONValidator} validator - client schema validator
   */
  constructor(validator) {
    super()

    /**
     * Client schema validator
     * @type {JSONValidator}
     * @private
     */
    this._validator = validator

    /**
     * Client entity
     * @typedef {Object} ClientEntity
     * @property {string} name - client name
     * @property {string} scope - client scope(s)
     * @property {Array} grants - client grants
     * @property {string} redirectUris - redirect uri
     * @private
     */

    /**
     * Client entity object
     * @type {ClientEntity}
     * @private
     */
    this._client = {
      name: '',
      scope: '',
      grants: [],
      redirectUris: ''
    }
  }

  /**
   * Get the schema from the JSONValidator instance
   * @returns {*}
   */
  getSchema() {
    return this._validator.schema
  }

  /**
   * Get the default entity object with default values by looking
   * up the the schema, field definitions and initial values from the
   * JSONValidator instance
   * @returns {*}
   */
  getDefaultEntity() {
    return this._validator.defaultEntity
  }

  /**
   * Getter for the client entity
   * @returns {ClientEntity}
   * @public
   */
  get client() {
    return this._client
  }

  /**
   * Find clients by query
   * @param query
   * @returns {Promise<any|never>}
   */
  async find(query) {
    try {
      return await super.find('/api/clients', query)
    } catch (err) {
      throw err
    }
  }

  /**
   * Create client entity
   * @param {ClientEntity} client - client entity object
   * @returns {Promise<ClientEntity>} - promise resolves to a client entity object
   * @throws {ValidationError}
   * @public
   * @override
   */
  async post(client) {
    try {
      this._validator.isValid(client)
      return (this._client = await super.post('/api/clients', client))
    } catch (err) {
      throw err
    }
  }

  /**
   * Update client
   * @param {string} id - unique client id
   * @param {ClientEntity} client - client entity object
   * @returns {Promise<ClientEntity>} - promise resolves to a client entity object
   * @throws {ValidationError}
   */
  async put(id, client) {
    try {
      this._validator.isValid(client)
      return (this._client = await super.put(`/api/clients/${id}`, client))
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete client
   * @param {string} id - unique client id
   * @returns {Promise<any|never>}
   * @public
   * @override
   */
  async delete(id) {
    try {
      return (this.entity = await super.delete(`/api/clients/${id}`))
    } catch (err) {
      throw err
    }
  }
}

export default new ClientAPI(ClientValidator)
