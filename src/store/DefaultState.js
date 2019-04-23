/**
 * @prettier
 * @description: Default global state tree
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { sessionMgr, profileMgr, clientMgr } from '../domain/entity/index'

/**
 * @description Global state tree
 * @typedef {Object} State
 * @property {String} status - Status logger text
 * @property {ValidationException} error - Application error state
 * @property {Boolean} isFetching - Loading indicator
 * @property {Session} session - Current user session
 * @property {Profile} profile - Current user profile
 * @property {Object} users - Users state
 * @property {Object} clients - Clients state
 */

/**
 * Global state tree
 * @type {State}
 */
const defaultState = {
  status: 'Application started',
  /**
   * Error state
   * @type {ValidationException}
   */
  error: {},
  isFetching: false,
  /**
   * Session state
   * @type {Session}
   */
  session: sessionMgr.getDefaultSession(),
  /**
   * Profile state
   * @type {Profile}
   */
  profile: profileMgr.getDefaultProfile(),
  users: {
    entity: {},
    entities: []
  },
  /**
   * Client state
   * @type {Object} - client state
   */
  clients: {
    entity: clientMgr.getDefaultClient(),
    entities: []
  }
}

export default defaultState
