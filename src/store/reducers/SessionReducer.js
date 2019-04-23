/**
 * @prettier
 * @description: SessionEntity reducer
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import defaults from '../DefaultState'
import { FETCH_SESSION_SUCCESS, FETCH_REFRESH_SESSION_SUCCESS } from '../constants'

/**
 * Reduce the session entity in the state tree
 * @param {SessionEntity} state - session state entity
 * @param {Object} action - action object with a type property
 * @returns {SessionEntity} - reduced session entity
 */
function sessionReducer(state = defaults.session, action) {
  switch (action.type) {
    case FETCH_SESSION_SUCCESS:
    case FETCH_REFRESH_SESSION_SUCCESS:
      return action.payload

    default:
      return state
  }
}

export default sessionReducer
