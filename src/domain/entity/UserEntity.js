/**
 * @prettier
 * @description: UserEntity class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './XHRService'
import JSONValidator from './validator/JSONValidator'

/**
 * User entity
 * @typedef {Object} User
 * @property {string} username - username
 * @property {string} scope - authorized scope
 * @property {boolean} admin - admin user flag
 * @property {boolean} active - active user flag
 */

/**
 * UserEntity class
 * @constructor
 */
class UserEntity extends XHRService {
  /**
   * UserEntity constructor
   * @param {JSON} schema - json entity schema
   * @param {Object} options - constructor options
   * @param {string} options.url - resource url identifier
   */
  constructor(schema, { url = '/api/users/' } = {}) {
    super()
    /**
     * UserEntity validator
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
   * Get default user
   * @returns {User}
   */
  getDefaultUser() {
    return this._validator.defaultEntity
  }


  async findUsers(params) {
    try {
      return await super.find(this._url, params)
    } catch (err) {
      throw err
    }
  }

  async createUser(user) {
    try {
      let response = await super.post(this._url, user)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async getUserById(id) {
    try {
      let response = await super.get(this._url + id)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async updateUser(id, user) {
    try {
      let response = await super.put(this._url + id, user)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async deleteUserById(id) {
    try {
      return await super.delete(this._url + id)
    } catch (err) {
      throw err
    }
  }

}

export default UserEntity
