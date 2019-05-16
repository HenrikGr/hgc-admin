/**
 * @prettier
 * @description: SessionEntityMgr class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import sessionSchema from './schemas/session'
import JSONValidator from './validator/JSONValidator'

/**
 * Session entity object
 * @typedef {Object} SessionEntity - session entity object
 * @property {Boolean} isAuth - User authenticated
 * @property {Number} expires_in - Milliseconds for the session to be valid
 * @property {Date} expiresAt - Date when session is expired
 */

/**
 * SessionEntityMgr class
 * @class
 */
class SessionEntityMgr {
  constructor() {
    /**
     * TokenEntity validator
     * @type {JSONValidator}
     * @private
     */
    this._validator = new JSONValidator(sessionSchema)

    /**
     * Instance default entity
     * @type {SessionEntity}
     * @private
     */
    this._entity = this._validator.defaultEntity
  }

  /**
   * Getter to retrieve the instance entity
   * @public
   * @returns {SessionEntity} - instance entity object
   */
  get entity() {
    return this._entity
  }

  /**
   * Setter to set the instance entity
   * @public
   * @param {SessionEntity|TokenEntity} entity - entity object to update instance entity
   */
  set entity(entity) {
    this._entity = this.isValid(entity)
  }

  /**
   * Validation function
   * @public
   * @returns {SessionEntity|ValidationException} - the instance entity or a validation exception
   */
  isValid(entity) {
    try {
      return this._validator.isValid(entity)
    } catch (err) {
      throw err
    }
  }
}

export default SessionEntityMgr
