/**
 * @prettier
 * @description: SessionAPI services
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { CredentialsValidator } from '../entity/validator'
import TokenAPI from './TokenAPI'

/**
 * SessionAPI class
 * @class
 * @augments TokenAPI
 */
class SessionAPI extends TokenAPI {
  /**
   * SessionAPI Constructor
   */
  constructor() {
    super()

    /**
     * CredentialsEntity schema validator
     * @type {JSONValidator}
     * @private
     */
    this._credentialsValidator = CredentialsValidator
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Calculate a date time when token is expired
   * @param {EntityManager} token - token
   * @returns {Date} - a date object when the token is expired
   * @private
   */
  _calculateExpiresAt(token) {
    const { expires_in } = token
    const now = Date.now()
    return new Date(now + expires_in * 1000)
  }

  /**
   * Create session entity
   * @param {object} credentials - credentials object
   * @param {String} credentials.username - username
   * @param {String} credentials.password - password
   * @returns {Promise<SessionEntity>} - promise resolved to an session entity object
   * @throws {ValidationError}
   * @public
   * @override
   */
  async post(credentials) {
    try {
      this._credentialsValidator.isValid(credentials)
      const response = await super.post(credentials)
      return {
        isAuth: true,
        expires_in: response.expires_in,
        expiresAt: this._calculateExpiresAt(response)
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Update session entity
   * @returns {Promise<SessionEntity>} - promise resolved to an session entity object
   * @throws {ValidationError}
   * @public
   * @override
   */
  async put() {
    try {
      const response = await super.put()
      return {
        isAuth: true,
        expires_in: response.expires_in,
        expiresAt: this._calculateExpiresAt(response)
      }

    } catch (err) {
      throw err
    }
  }

  /**
   * Remove session entity
   * @returns {*}
   * @public
   * @override
   */
  remove() {
    try {
      // Remove token
      super.remove()
    } catch (err) {
      throw err
    }
  }
}

export default new SessionAPI()
