/**
 * @prettier
 * @description: TokenEntityMgr class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import tokenSchema from './schemas/token'
import JSONValidator from './validator/JSONValidator'
import Store from './Store'

/**
 * Token entity
 * @typedef {Object} TokenEntity
 * @property {string} access_token - oauth access token
 * @property {string} token_type- token type
 * @property {number} expires_in - time in ms the token is valid
 * @property {string} refresh_token - refresh token to issue a new token
 * @property {string} scope - scope of token
 */

/**
 * TokenEntityMgr class
 * @class
 */
class TokenEntityMgr {
  constructor() {
    /**
     * Store instance providing interface to sessionStorage to persist tokens
     * @type {Store}
     * @private
     */
    this._store = new Store()
    /**
     * Instance validation function
     * @type {JSONValidator}
     * @private
     */
    this._validator = new JSONValidator(tokenSchema)

    /**
     * Instance default entity
     * @type {TokenEntity}
     * @private
     */
    this._entity = this._validator.defaultEntity
  }

  /**
   * Getter to retrieve the instance entity
   * @returns {TokenEntity} - instance entity object
   * @public
   */
  get entity() {
    return this._entity
  }

  /**
   * Setter to set the instance entity
   * @param {TokenEntity} entity - entity object to update instance entity
   * @public
   */
  set entity(entity) {
    this._entity = this.isValid(entity)
  }

  /**
   * Persist token in store
   * @param {TokenEntity} entity - token to be persisted
   * @return {TokenEntity} - token persisted
   * @public
   */
  setStoreItem(entity) {
    this._store.setItem('token', entity)
  }

  /**
   * Remove token from store
   * @public
   */
  removeStoreItem() {
    this._store.removeItem('token')
  }

  /**
   * Get persisted token from store
   * @returns {TokenEntity} - the persisted token entity
   * @public
   */
  getStoreItem() {
    return this._store.getItem('token')
  }

  /**
   * Validation function
   * @returns {TokenEntity|ValidationException} - the instance entity or a validation exception
   * @public
   */
  isValid(entity) {
    try {
      return this._validator.isValid(entity)
    } catch (err) {
      throw err
    }
  }
}

export default TokenEntityMgr
