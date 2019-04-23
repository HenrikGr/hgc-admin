/**
 * @prettier
 * @description: ProfileAPI Service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ProfileValidator } from '../entity/validator'
import XHRService from './base/XHRService'

/**
 * Profile API class
 * @augments XHRService
 */
class ProfileAPI extends XHRService {
  /**
   * Constructor
   * @param {JSONValidator} validator - profile schema validator
   */
  constructor(validator) {
    super()

    /**
     * Profile Schema validator
     * @type {JSONValidator}
     * @private
     */
    this._validator = validator

    /**
     * Profile entity
     * @typedef {Object} ProfileEntity
     * @property {string} firstName - first name
     * @property {string} lastName - last name
     * @property {string} email - email address
     * @property {string} phone - phone
     * @private
     */

    /**
     * Profile entity object
     * @type {ProfileEntity}
     * @private
     */
    this._profile = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  }

  /**
   * Getter for profile entity object
   * @returns {ProfileEntity}
   * @public
   */
  get profile() {
    return this._profile
  }

  /**
   * Set profile
   * @param {ProfileEntity} profile
   * @public
   */
  set profile(profile) {
    this._profile = profile
  }

  /**
   * Get profile entity
   * @returns {Promise<ProfileEntity>} - a promise resolved to the profile entity object
   * @public
   * @override
   */
  async get() {
    try {
      return (this.profile = await super.get('/api/profiles/me'))
    } catch (err) {
      throw err
    }
  }

  /**
   * Update profile entity
   * @param {ProfileEntity} profile - profile entity object
   * @returns {Promise<ProfileEntity>} - a promise resolved to the current users profile entity object
   * @throws {ValidationError} - if validation of profile entity fails
   * @public
   * @override
   */
  async put(profile) {
    try {
      this._validator.isValid(profile)
      return (this.profile = await super.put('/api/profiles/me', profile))
    } catch (err) {
      throw err
    }
  }
}

export default new ProfileAPI(ProfileValidator)
