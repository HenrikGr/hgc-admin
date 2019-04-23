/**
 * @prettier
 * @description: ScopeEntity class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './XHRService'
import Store from './Store'

/**
 * Scope entity
 * @typedef {Object} Scope
 * @property {string} name - name of scope
 */

/**
 * ScopeEntity class
 * @constructor
 */
class ScopeEntity extends XHRService {
  /**
   * ScopeEntity constructor
   * @param {Object} options - constructor options
   * @param {string} options.url - resource url identifier
   * @param {string} options.persistKey - entity persistence key
   */
  constructor({ url = '/api/scopes', persistKey = null } = {}) {
    super()

    /**
     * Resource url entity identifier
     * @type {string}
     * @property
     * @private
     */
    this._url = url

    /**
     * Persist entity locally
     * @type {boolean}
     * @property
     * @private
     */
    this._localPersist = !!persistKey

    /**
     * Store to persist entity
     * @type {Store | null}
     * @property
     * @private
     */
    this._store = !!persistKey ? new Store(persistKey) : null
  }

  async createScope(name) {
    try {
      return await super.post(this._url, { name: name })
    } catch (err) {
      throw err
    }
  }

  async getAllScopes() {
    try {
      return await super.get(this._url)
    } catch (err) {
      throw err
    }
  }

  async deleteScope(name) {
    try {
      return await super.delete(this._url + '/' + name)
    } catch (err) {
      throw err
    }
  }
}

export default ScopeEntity
