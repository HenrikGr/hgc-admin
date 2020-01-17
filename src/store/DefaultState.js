/**
 * @prettier
 * @description: Default global state tree
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ClientAPI from '../domain/xhr/ClientAPI'
import ProfileAPI from '../domain/xhr/ProfileAPI'

/**
 * Profile API instance
 * @type {ProfileAPI}
 */
const profileAPI = new ProfileAPI()

/**
 * Client API instance
 * @type {ClientAPI}
 */
const clientAPI = new ClientAPI()

/**
 * @description Global state tree
 * @typedef {Object} State
 * @property {String} status - Status logger text
 * @property {ValidationException} error - Application error state
 * @property {Boolean} isFetching - flag indicating fetching state
 * @property {SessionEntity} session - Session entity
 * @property {ProfileEntity} profile - Profile entity
 * @property {Object} users - Users state object
 * @property {UserEntity} users.entity - Users entity
 * @property {UserEntity[]} users.entities - Array of user entities
 * @property {Object} clients - Clients state object
 * @property {ClientEntity} clients.entity - Client entity
 * @property {ClientEntity[]} dao.entities - Array of dao entities
 */

/**
 * Global state tree
 * @type {State}
 */
const defaultState = {
  status: 'Application started',
  error: {},
  isFetching: false,
  session: {
    isAuth: false,
    expires_in: 0,
    expiresAt: null
  },
  profile: profileAPI.profile,
  users: {
    entity: {},
    entities: []
  },
  clients: {
    entity: clientAPI.client,
    entities: []
  }
}

export default defaultState
