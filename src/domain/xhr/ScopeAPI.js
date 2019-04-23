/**
 * @prettier
 * @description: ScopeAPI Service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './base/XHRService'

/**
 * Scope API
 * @class
 */
class ScopeAPI extends XHRService {
  // eslint-disable-next-line
  constructor() {
    super()
  }

  async post(name) {
    try {
      return await super.post('/api/scopes', { name: name })
    } catch (err) {
      throw err
    }
  }

  async get() {
    try {
      return await super.get('/api/scopes/')
    } catch (err) {
      throw err
    }
  }

  async delete(name) {
    try {
      return await super.delete('/api/scopes/' + name)
    } catch (err) {
      throw err
    }
  }
}

export default new ScopeAPI()
