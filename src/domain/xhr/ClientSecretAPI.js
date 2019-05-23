/**
 * @prettier
 * @description: ClientSecretAPI Service
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import XHRService from './base/XHRService'

/**
 * ClientSecretAPI
 * @augments XHRService
 */
class ClientSecretAPI extends XHRService {
  // eslint-disable-next-line
  constructor() {
    super()
  }

  async get(name) {
    try {
      return await super.find('/api/clients/secret/' + name)
    } catch (err) {
      throw err
    }
  }

  async patch(name) {
    try {
      return await super.patch('/api/clients/secret/' + name)
    } catch (err) {
      throw err
    }
  }

}

export default new ClientSecretAPI()
