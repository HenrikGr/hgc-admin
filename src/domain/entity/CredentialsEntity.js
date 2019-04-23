/**
 * @prettier
 * @description: CredentialsEntity
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CredentialsValidator } from './validator'
import invariant from 'fbjs/lib/invariant'

/**
 * Credentials entity
 * @typedef {Object} Credentials credentials entity
 * @property {string} username - username
 * @property {string} password - password
 * @property {string} client_id - client id
 * @property {string} grant_type - grant type
 */

/**
 * CredentialsEntity class
 * @class
 */
class CredentialsEntity {
  /**
   * CredentialsEntity constructor
   * @param {string} username - username
   * @param {string} password- password
   */
  constructor(username, password) {
    invariant(
      typeof username !== 'undefined' && typeof password !== 'undefined',
      'CredentialsEntity - constructor must have valid arguments'
    )

    /**
     * CredentialsEntity validator
     * @type {JSONValidator}
     * @private
     */
    this._validator = CredentialsValidator

    /**
     * Credentials
     * @type {Credentials}
     * @private
     */
    this._credentials = {
      username: username,
      password: password,
      client_id: this._validator.defaultEntity.client_id,
      grant_type: this._validator.defaultEntity.grant_type
    }
  }

  /**
   * Validate credentials
   * @returns {Credentials} credentials - credentials entity
   * @throws {ValidationException} - on validation error
   * @public
   */
  isValid() {
    try {
      return this._validator.isValid(this._credentials)
    } catch (err) {
      throw err
    }
  }
}

export default CredentialsEntity
