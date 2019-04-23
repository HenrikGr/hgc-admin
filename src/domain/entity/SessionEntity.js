/**
 * @prettier
 * @description: TokenEntity class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import CredentialsEntity from './CredentialsEntity'
import JSONValidator from './validator/JSONValidator'
import XHRService from './XHRService'
import invariant from 'fbjs/lib/invariant'

/**
 * Session entity
 * @typedef {Object} Session - session entity object
 * @property {Boolean} isAuth - User authenticated
 * @property {Number} expires_in - Milliseconds for the session to be valid
 * @property {Date} expiresAt - Date when session is expired
 */

/**
 * Token entity
 * @typedef {Object} Token
 * @property {string} access_token - oauth access token
 * @property {string} token_type- token type
 * @property {number} expires_in - time in ms the token is valid
 * @property {string} refresh_token - refresh token to issue a new token
 * @property {string} scope - scope of token
 */

/**
 * SessionEntity class
 * @class
 * @public
 */
class SessionEntity extends XHRService {
  /**
   * TokenEntity constructor
   * @param {JSON} schema - json entity schema
   * @param {Object} options - constructor options
   * @param {string} options.url - resource url identifier
   */
  constructor(schema, { url = '/oauth/tokens' } = {}) {
    super()
    invariant(url, 'EntityManager - constructor must have a url argument')

    /**
     * TokenEntity validator
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
   * Get schema default entity
   * @returns {Session}
   * @public
   */
  getDefaultSession() {
    return {
      isAuth: false,
      expires_in: 0,
      expiresAt: null
    }
  }

  /**
   * Create session
   * @param {string} username - username
   * @param {string} password - password
   * @returns {Promise<Session>} - promise that resolves to a session entity
   * @throws {ValidationException} - if credentials or token is not valid
   * @public
   */
  async createSession(username, password) {
    try {
      let credentials = new CredentialsEntity(username, password).isValid()
      let token = await super.post(this._url, credentials)
      this._validator.isValid(token)
      super.persistToken(token)
      return {
        isAuth: true,
        expires_in: token.expires_in,
        expiresAt: new Date(Date.now() + token.expires_in * 1000)
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Refresh session
   * @returns {Promise<Session>} - promise that resolves to a session entity
   * @throws {ValidationException} - if the new token is not valid
   * @public
   */
  async refreshSession() {
    try {
      let { refresh_token } = super.getPersistedToken()
      let token = await super.post(this._url, refresh_token)
      this._validator.isValid(token)
      super.persistToken(token)
      return {
        isAuth: true,
        expires_in: token.expires_in,
        expiresAt: new Date(Date.now() + token.expires_in * 1000)
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete session
   * @returns {Session} - an empty session object
   */
  deleteSession() {
    super.removePersistedToken()
    return {}
  }
}

export default SessionEntity
