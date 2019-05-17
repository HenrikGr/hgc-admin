/**
 * @prettier
 * @description: ProfileAPI class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './base/XHRService'
import JSONValidator from '../entity/validator/JSONValidator'
import profileSchema from '../entity/schemas/profile'

/**
 * Profile entity
 * @typedef {Object} ProfileEntity
 * @property {string} firstName - first name
 * @property {string} lastName - last name
 * @property {string} email - email address
 * @property {string} phone - phone number
 */

/**
 * ProfileAPI class provide an interface to find, update and delete profile entities
 * The class extends the XHRService class which is a HTTP client wrapper
 *
 * @example
 * const profileAPI = new ProfileAPI()
 * const myProfile = await profileAPI.findOrCreateMe()
 * const myUpdatedProfile = await profile.updateMe(data)
 *
 * @extends XHRService
 */
class ProfileAPI extends XHRService {
  /**
   * Profile API constructor
   * @param {Object} options - constructor options
   * @param {string} options.url - resource url identifier
   */
  constructor({ url = '/api/profiles/' } = {}) {
    super()
    /**
     * Re3source url for tokens
     * @type {String}
     * @private
     */
    this._profileURL = url
    /**
     * Instance validation function
     * @type {JSONValidator}
     * @private
     */
    this._profileValidator = new JSONValidator(profileSchema)
    /**
     * Instance default entity
     * @type {ProfileEntity}
     * @private
     */
    this._profile = this._profileValidator.defaultEntity
  }

  /**
   * Getter to retrieve the instance entity
   * @returns {ProfileEntity} - instance entity object
   * @public
   */
  get profile() {
    return this._profile
  }

  /**
   * Setter to set the instance entity
   * @param {ProfileEntity} entity - entity object to update instance entity
   * @public
   */
  set profile(entity) {
    try {
      this._profile = this._profileValidator.isValid(entity)
    } catch (err) {
      throw err
    }
  }

  /**
   * Find or create a profile for the current user
   * @returns {Promise<ProfileEntity>} - a promise resolved to a profile entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async findOrCreateMe() {
    try {
      this.profile = await super.get(this._profileURL + 'me')
      return this.profile
    } catch (err) {
      throw err
    }
  }

  /**
   * Update current user profile
   * @param {ProfileEntity} profile - profile data to update
   * @returns {Promise<ProfileEntity>} - a promise resolved to a profile entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async updateMe(profile) {
    try {
      this.profile = await super.put(this._profileURL + 'me', profile)
      return this.profile
    } catch (err) {
      throw err
    }
  }
}

export default ProfileAPI
