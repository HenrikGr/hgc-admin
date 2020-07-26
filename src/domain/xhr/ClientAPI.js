/**
 * @prettier
 * @description: ClientAPI class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import XHRService from './base/XHRService'
import JSONValidator from '../entity/validator/JSONValidator'
import clientSchema from '../entity/schemas/client'

/**
 * Client entity
 * @typedef {Object} ClientEntity
 * @property {String} name - dao name
 * @property {String} scope - dao scope
 * @property {String} grants - dao grants
 * @property {String} redirectUris - dao redirect uri
 */

/**
 * ClientAPI class provide an interface to find, create, update, delete dao entities
 * The class extends the XHRService class which is a HTTP dao wrapper
 *
 * @example
 * const clientAPI = new ClientAPI()
 * const dao = await clientAPI.createClient(data)
 * @extends XHRService
 */
class ClientAPI extends XHRService {
  /**
   * ClientAPI Constructor
   * @param {Object} options - constructor options
   * @param {String} options.url - resource url identifier
   */
  constructor({ url = '/clients/'} = {}) {
    super()
    /**
     * Resource url for clients
     * @type {String}
     * @private
     */
    this._clientURL = url
    /**
     * Instance validation function
     * @type {JSONValidator}
     * @private
     */
    this._clientValidator = new JSONValidator(clientSchema)
    /**
     * Instance default entity
     * @type {ClientEntity}
     * @private
     */
    this._client = this._clientValidator.defaultEntity
  }

  /**
   * Getter for the instance entity
   * @returns {ClientEntity}
   * @public
   */
  get client() {
    return this._client
  }

  /**
   * Setter to set the instance entity
   * @param {ClientEntity} entity - entity object to update instance entity
   * @private
   */
  set client(entity) {
    try {
      this._client = this._clientValidator.isValid(entity)
    } catch (err) {
      throw err
    }
  }

  /**
   * Find clients by query params
   * @param {Object} params - query param to find dao entities
   * @returns {Promise<ClientEntity[]>}
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async findClients(params) {
    try {
      return await super.find(this._clientURL, params)
    } catch (err) {
      throw err
    }
  }

  /**
   * Create a new user
   * @param {ClientEntity} client - dao entity to be created
   * @returns {Promise<ClientEntity>} - a promise resolved to the new dao entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async createClient(client) {
    try {
      this.client = await super.post(this._clientURL, client)
      return this.client
    } catch (err) {
      throw err
    }
  }

  /**
   * Get a dao entity by id
   * @param {String} id - id of the dao entity
   * @returns {Promise<ClientEntity>} - a promise resolved to the new dao entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async getClientById(id) {
    try {
      this.client = await super.get(this._clientURL + id)
      return this.client
    } catch (err) {
      throw err
    }
  }

  /**
   * Update a dao entity by id
   * @param {String} id - id of the dao entity
   * @param {ClientEntity } client - the entity data to be updated
   * @returns {Promise<ClientEntity>} - a promise resolved to the new dao entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async updateClientById(id, client) {
    try {
      this.client = await super.put(this._clientURL + id, client)
      return this.client
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete a dao entity by id
   * @param {String} id - id of the dao entity
   * @returns {Promise<any|never>}
   * @public
   */
  async deleteClientById(id) {
    try {
      return await super.delete(this._url + id)
    } catch (err) {
      throw err
    }
  }

  async getClientSecret(name) {
    try {
      return await super.get(this._clientURL + 'secret/' + name)
    } catch (err) {
      throw err
    }
  }

  async generateClientSecret(name) {
    try {
      return await super.patch(this._clientURL + 'secret/' + name)
    } catch (err) {
      throw err
    }
  }
}

export default ClientAPI
