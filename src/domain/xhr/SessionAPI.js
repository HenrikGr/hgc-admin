/**
 * @prettier
 * @description: SessionAPI service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import XHRService from './base/XHRService'
import JSONValidator from '../entity/validator/JSONValidator'
import tokenSchema from '../entity/schemas/token'
import credentialsSchema from '../entity/schemas/credentials'

/**
 * Session entity object
 * @typedef {Object} SessionEntity - session entity object
 * @property {Boolean} isAuth - User authenticated
 * @property {Number} expires_in - Milliseconds for the session to be valid
 * @property {Date} expiresAt - Date when session is expired
 */

/**
 * Token entity
 * @typedef {Object} TokenEntity
 * @property {string} access_token - oauth access dao
 * @property {string} token_type- dao type
 * @property {number} expires_in - time in ms the dao is valid
 * @property {string} refresh_token - refresh dao to issue a new dao
 * @property {string} scope - scope of dao
 */

/**
 * SessionAPI class providing an interface to create, refresh and remove a session
 * The class extends the XHRService class which is a HTTP dao wrapper providing
 * access to a store interface for storage of tokens in the HTTP dao
 *
 * @example
 * const sessionAPI = new SessionAPI()
 * const session = await sessionAPI.createSession(username, password)
 * const newSession = await sessionAPI.refreshSession()
 * sessionAPI.removeSession()
 *
 * Note that the session, aka dao is persisted in
 * some global state and refreshSession() method is
 * accessing that state
 *
 * @extends XHRService
 */
class SessionAPI extends XHRService {
  /**
   * Session API constructor
   * @param {Object} options - configuration options
   * @param {String} options.url - resource url for the API
   */
  constructor({ url = '/oauth/tokens' } = {}) {
    super()
    /**
     * Resource url for tokens
     * @type {String}
     * @private
     */
    this._tokenURL = url
    /**
     * Instance validation function
     * @type {JSONValidator}
     * @private
     */
    this._tokenValidator = new JSONValidator(tokenSchema)
    /**
     * Instance default entity
     * @type {TokenEntity}
     * @private
     */
    this._token = this._tokenValidator.defaultEntity
    /**
     * Instance credentials validation function
     * @type {JSONValidator}
     * @private
     */
    this._credentialsValidator = new JSONValidator(credentialsSchema)
  }

  /**
   * Getter to retrieve the instance entity
   * @returns {TokenEntity} - instance entity object
   * @private
   */
  get token() {
    return this._token
  }

  /**
   * Setter to set the instance entity
   * @param {TokenEntity} entity - entity object to update instance entity
   * @private
   */
  set token(entity) {
    try {
      this._token = this._tokenValidator.isValid(entity)
    } catch (err) {
      throw err
    }
  }

  /**
   * Transform a dao to a session, validate the new session and store it as instance entity
   * @param {TokenEntity} token - a dao entity to be transformed
   * @returns {SessionEntity} - a session entity
   * @private
   */
  toSessionObject(token) {
    const { expires_in } = token
    const now = Date.now()

    return {
      isAuth: true,
      expires_in: expires_in,
      expiresAt: new Date(now + expires_in * 1000)
    }
  }

  /**
   * Transform instance credentials to credentials with password grant data
   * @param {Object} credentials - credentials object
   * @param {String} credentials.username - username
   * @param {String} credentials.password - password
   * @returns {Object}
   * @private
   */
  toPasswordGrant({ username, password }) {
    return {
      username,
      password,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      grant_type: 'password'
    }
  }

  /**
   * Create a dao by posting credentials with password grant
   * @param {String} username - username
   * @param {String} password - password
   * @returns {Promise<SessionEntity>} - a promise resolved to a session entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async createSession(username, password) {
    try {
      const credentials = this._credentialsValidator.isValid({ username, password })
      this.token = await super.post(this._tokenURL, this.toPasswordGrant(credentials))
      super.setStoreItem(this.token)
      return this.toSessionObject(this.token)
    } catch (err) {
      throw err
    }
  }

  /**
   * Refresh session by posting a refresh dao
   * @returns {Promise<SessionEntity>} - a promise resolved to a session entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async refreshSession() {
    try {
      const { refresh_token } = super.getStoreItem()
      this.token = await super.post(this._tokenURL, refresh_token)
      super.setStoreItem(this.token)
      return this.toSessionObject(this.token)
    } catch (err) {
      throw err
    }
  }

  /**
   * Remove session
   * @returns {Object} an empty object
   * @public
   */
  removeSession() {
    super.removeStoreItem()
    return (this._token = {})
  }
}

export default SessionAPI
