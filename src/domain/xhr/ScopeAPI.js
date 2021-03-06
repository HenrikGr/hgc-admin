/**
 * @prettier
 * @description: ScopeAPI class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './base/XHRService'

/**
 * Scope entity
 * @typedef {Object} Scope
 * @property {string} name - name of scope
 */

/**
 * ScopeAPI class
 * @constructor
 */
class ScopeAPI extends XHRService {
  /**
   * ScopeAPI constructor
   * @param {Object} options - constructor options
   * @param {string} options.url - resource url identifier
   */
  constructor({ url = '/scopes' } = {}) {
    super()

    /**
     * Resource url entity identifier
     * @type {string}
     * @property
     * @private
     */
    this._url = url
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

export default new ScopeAPI()
