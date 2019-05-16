/**
 * @prettier
 * @description: SessionAPI services
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import TokenAPI from './TokenAPI'
import SessionEntityMgr from '../entity/SessionEntityMgr'

/**
 * SessionAPI class
 * @class
 */
class SessionAPI extends TokenAPI {
  constructor() {
    super()

    /**
     * Token entity manager
     * @type {SessionEntityMgr}
     * @private
     */
    this._sessionMgr = new SessionEntityMgr()
  }

  /**
   * Transform a token to a session, validate the new session and store it as instance entity
   * @param {TokenEntity} token - a token entity to be transformed
   * @returns {SessionEntity|ValidationException} - the instance entity or a validation exception
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
   * Create a new session
   * @param {String} username - username
   * @param {String} password - password
   * @returns {Promise<SessionEntity|ValidationException>} - a promise resolver to session or a validation exception
   */
  async createSession(username, password) {
    try {
      const token = await super.createToken(username, password)
      this._sessionMgr.entity = this.toSessionObject(token)
      return this._sessionMgr.entity
    } catch (err) {
      throw err
    }
  }

  /**
   * Refresh the existing session
   * @returns {Promise<SessionEntity|ValidationException>} - a promise resolved to session or a validation exception
   */
  async refreshSession() {
    try {
      let token = await super.refreshToken()
      this._sessionMgr.toSessionObject(token)
      return this._sessionMgr.entity
    } catch (err) {
      throw err
    }
  }

  /**
   * Remove session
   * @returns {Promise<{SessionEntity}>}
   */
  async removeSession() {
    this._sessionMgr.entity = super.removeToken()
    return this._sessionMgr.entity
  }
}

export default new SessionAPI()
