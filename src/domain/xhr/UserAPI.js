/**
 * @prettier
 * @description: UserAPI Service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import XHRService from './base/XHRService'
import JSONValidator from '../entity/validator/JSONValidator'
import userSchema from '../entity/schemas/user'

/**
 * User entity
 * @typedef {Object} UserEntity
 * @property {String} username - user name
 * @property {String} scope - user scope(s)
 * @property {Boolean} admin - admin user flag
 * @property {Boolean} active - active user flag
 * @private
 */

/**
 * UserAPI provides an interface to find, create, update and delete user entities
 * The class extends the XHRService class which is a HTTP dao wrapper
 *
 * @example
 * const userAPI = new UserAPI()
 * const user1 = await profileAPI.createUser(data)
 * @extends XHRService
 */
class UserAPI extends XHRService {
  /**
   * UserAPI Constructor
   * @param {Object} options - constructor options
   * @param {String} options.url - resource url identifier
   */
  constructor({ url = '/users/' } = {}) {
    super()
    /**
     * Resource url for users
     * @type {string}
     * @private
     */
    this._userURL = url
    /**
     * Instance validation function
     * @type {JSONValidator}
     * @private
     */
    this._userValidator = new JSONValidator(userSchema)
    /**
     * Instance default entity
     * @type {UserEntity}
     * @private
     */
    this._user = this._userValidator.defaultEntity
  }

  /**
   * Getter for the instance entity
   * @returns {UserEntity}
   * @public
   */
  get user() {
    return this._user
  }

  /**
   * Setter to set the instance entity
   * @param {UserEntity} entity - entity object to update instance entity
   * @private
   */
  set user(entity) {
    try {
      this._user = this._userValidator.isValid(entity)
    } catch (err) {
      throw err
    }
  }

  /**
   * Find users by query params
   * @param {Object} params - query param to find user entities
   * @returns {Promise<UserEntity[]>}
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async findUsers(params) {
    try {
      return await super.find(this._userURL, params)
    } catch (err) {
      throw err
    }
  }

  /**
   * Create a new user
   * @param {UserEntity} user - user entity to be created
   * @returns {Promise<UserEntity>} - a promise resolved to the new user entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async createUser(user) {
    try {
      this.user = await super.post(this._userURL, user)
      return this.user
    } catch (err) {
      throw err
    }
  }

  /**
   * Get a user entity by id
   * @param {String} id - id of the user entity
   * @returns {Promise<UserEntity>} - a promise resolved to the new user entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async getUserById(id) {
    try {
      this.user = await super.get(this._userURL + id)
      return this.user
    } catch (err) {
      throw err
    }
  }

  /**
   * Update a user entity by id
   * @param {String} id - id of the user entity
   * @param {UserEntity } user - the entity data to be updated
   * @returns {Promise<UserEntity>} - a promise resolved to the new user entity
   * @throws {ValidationException} throws an error on failure
   * @public
   */
  async updateUserById(id, user) {
    try {
      this.user = await super.put(this._userURL + id, user)
      return this.user
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete a user entity by id
   * @param {String} id - id of the user entity
   * @returns {Promise<any|never>}
   * @public
   */
  async deleteUserById(id) {
    try {
      return await super.delete(this._userURL + id)
    } catch (err) {
      throw err
    }
  }
}

export default UserAPI
