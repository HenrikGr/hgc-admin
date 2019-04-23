/**
 * @prettier
 * @description: UserAPI Service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { UserValidator } from '../entity/validator'
import XHRService from './base/XHRService'

/**
 * UserAPI
 * @augments XHRService
 */
class UserAPI extends XHRService {
  /**
   * Constructor
   * @param {JSONValidator} validator - user schema validator
   */
  constructor(validator) {
    super()

    /**
     * User schema validator
     * @type {JSONValidator}
     * @private
     */
    this._validator = validator

    /**
     * User entity
     * @typedef {Object} UserEntity
     * @property {string} username - user name
     * @property {string} scope - user scope(s)
     * @property {boolean} admin - admin user flag
     * @property {boolean} active - active user flag
     * @private
     */

    /**
     * Client entity object
     * @type {UserEntity}
     * @private
     */
    this._user = {
      username: '',
      scope: '',
      admin: false,
      active: false
    }
  }

  /**
   * Getter for the client entity
   * @returns {UserEntity}
   * @public
   */
  get user() {
    return this._user
  }

  /**
   * Find users by query
   * @param query
   * @returns {Promise<any|never>}
   */
  async find(query) {
    try {
      return await super.find('/api/users', query)
    } catch (err) {
      throw err
    }
  }

  /**
   * Create user entity
   * @param {UserEntity} user - user entity
   * @returns {Promise<UserEntity>} - promise resolves to a user entity object
   * @throws {ValidationError}
   * @public
   * @override
   */
  async post(user) {
    try {
      this._validator.isValid(user)
      return (this._user = await super.post('/api/users', user))
    } catch (err) {
      throw err
    }
  }

  /**
   * Update client
   * @param {Array|string} ids - unique user id
   * @param {UserEntity} user - user entity object
   * @returns {Promise<UserEntity>} - promise resolves to a client entity object
   * @throws {ValidationError}
   */
  async put(ids, user) {
    try {
      this._validator.isValid(user)

      if (Array.isArray(ids)) {
        let promises = []
        ids.forEach(id => {
          promises.push(super.put(`/api/users/${id}`, user))
        })

        // Return a resolved or rejected promise
        return new Promise((resolve, reject) => {
          // Concurrently run the promises array
          return Promise.all(promises)
            .then(response => {
              return resolve(response.map(r => r.data))
            })
            .catch(err => {
              return reject(err)
              //return reject(err.map(e => e.error));
            })
        })
      } else {
        return (this._user = await super.put(`/api/users/${ids}`, user))
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete user
   * @param {string} id - unique user id
   * @returns {Promise<any|never>}
   * @public
   * @override
   */
  async delete(id) {
    try {
      return (this._user = await super.delete(`/api/users/${id}`))
    } catch (err) {
      throw err
    }
  }
}

export default new UserAPI(UserValidator)
