/**
 * @prettier
 * @description: TokenAPI service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from '../entity/XHRService'
import CredentialsEntityMgr from '../entity/CredentialsEntityMgr'
import TokenEntityMgr from '../entity/TokenEntityMgr'

/**
 * TokenAPI class
 * @extends XHRService
 */
class TokenAPI extends XHRService {
  constructor({ url = '/oauth/tokens' } = {}) {
    super()

    /**
     * Re3source url for tokens
     * @type {string}
     * @private
     */
    this._url = url

    /**
     * Token entity manager
     * @type {TokenEntityMgr}
     * @private
     */
    this._tokenMgr = new TokenEntityMgr()
  }

  /**
   * Create a token by posting credentials with password grant
   * @param {String} username - username
   * @param {String} password - password
   * @returns {Promise<TokenEntity|ValidationException>} - a promise resolved to a token or a validation exception
   */
  async createToken(username, password) {
    try {
      const credMgr = new CredentialsEntityMgr(username, password)
      const token = await super.post(this._url, credMgr.toPasswordGrant())

      this._tokenMgr.entity = token
      this._tokenMgr.setStoreItem(token)

      return this._tokenMgr.entity
    } catch (err) {
      throw err
    }
  }

  /**
   * Refresh session by posting a refresh token
   * @returns {Promise<TokenEntity|ValidationException>} - a promise resolved to a token or a validation exception
   */
  async refreshToken() {
    try {
      const { refresh_token } = super.getStoreItem()
      const token = await super.post(this._url, refresh_token)

      this._tokenMgr.entity = token
      this._tokenMgr.setStoreItem(token)

      return this._tokenMgr.entity
    } catch (err) {
      throw err
    }
  }

  /**
   * Remove token from store and instance entity
   * @returns {TokenEntity} - en empty token entity object
   */
  removeToken() {
    this._tokenMgr.entity = {}
    this._tokenMgr.removeStoreItem()
    return this._tokenMgr.entity
  }

}

export default TokenAPI
