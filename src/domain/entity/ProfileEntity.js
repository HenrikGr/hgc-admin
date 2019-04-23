/**
 * @prettier
 * @description: SessionEntity class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './XHRService'
import JSONValidator from './validator/JSONValidator'

/**
 * Profile entity
 * @typedef {Object} Profile
 * @property {string} firstName - first name
 * @property {string} lastName - last name
 * @property {string} email - email address
 * @property {string} phone - phone number
 */

/**
 * ProfileEntity class
 * @constructor
 */
class ProfileEntity extends XHRService {
  /**
   * ProfileEntity constructor
   * @param {JSON} schema - json entity schema
   * @param {Object} options - constructor options
   * @param {string} options.url - resource url identifier
   */
  constructor(schema, { url = '/api/profiles/' } = {}) {
    super()
    /**
     * ProfileEntity validator
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
   * Get default profile
   * @returns {Profile}
   */
  getDefaultProfile() {
    return this._validator.defaultEntity
  }

  /**
   * Find or create current user profile
   * @returns {Promise<Profile>}
   * @throws {ValidationException} - if schema validation fails
   * @public
   */
  async findOrCreateMe() {
    try {
      let response = await super.get(this._url + 'me')
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  /**
   * Update current user profile
   * @param {Profile} profile - profile data to update
   * @returns {Promise<Profile>} - a promise resolved to the updated profile
   * @throws {ValidationException} - if schema validation fails
   */
  async updateMe(profile) {
    try {
      this._validator.isValid(profile)
      let response = await super.put(this._url + 'me', profile)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async findProfiles(params) {
    try {
      return await super.find(this._url, params)
    } catch (err) {
      throw err
    }
  }

  async createProfile(profile) {
    try {
      let response = await super.post(this._url, profile)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async getProfile(id) {
    try {
      let response = await super.get(this._url + id)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async updateProfile(id, profile) {
    try {
      let response = await super.put(this._url + id, profile)
      return this._validator.isValid(response)
    } catch (err) {
      throw err
    }
  }

  async deleteProfile(id) {
    try {
      return await super.delete(this._url + id)
    } catch (err) {
      throw err
    }
  }
}

export default ProfileEntity
