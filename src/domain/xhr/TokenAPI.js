/**
 * @prettier
 * @description: TokenAPI service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './base/XHRService'
import { TokenValidator } from '../entity/validator'
const API_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

/**
 * TokenAPI class
 * @extends XHRService
 */
class TokenAPI extends XHRService {
  /**
   * TokenAPI Constructor
   */
  constructor() {
    super()

    /**
     * Token entity validator
     * @type {JSONValidator}
     * @private
     */
    this._tokenValidator = TokenValidator
  }

  /**
   * Post credentials to get a token entity object
   * @param {CredentialsEntity} credentials - credentials entity object
   * @returns {Promise<SessionEntity>} - promise resolved to a token entity object
   * @throws {ValidationError} - if validation of token entity fails
   * @public
   * @override
   */
  async post(credentials) {
    try {
      const response = await super.post('/oauth/tokens', {
        username: credentials.username,
        password: credentials.password,
        client_id: API_CLIENT_ID,
        grant_type: 'password'
      })
      this._tokenValidator.isValid(response)
      super.setAuthorizationHeader(response)
      return response
    } catch (err) {
      throw err
    }
  }

  /**
   * Get a new token based on the refresh_token
   * @returns {Promise<SessionEntity>} - promise resolved to a token entity object
   * @throws {ValidationError} - if returned token validation fails
   * @public
   */
  async put() {
    try {
      let response = await super.put('/oauth/tokens', {
        refresh_token: this._token.refresh_token,
        client_id: API_CLIENT_ID,
        grant_type: 'refresh_token'
      })

      this._tokenValidator.isValid(response)
      super.setAuthorizationHeader(response)
      return response
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete token entity and clear the Authorization header in XHRService
   * @public
   */
  remove() {
    super.removeAuthorizationHeader()
  }
}

export default TokenAPI
