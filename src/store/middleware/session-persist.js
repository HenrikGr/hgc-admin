/**
 * @prettier
 * @description: SessionEntityMgr store middleware
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { FETCH_SESSION_SUCCESS, FETCH_REFRESH_SESSION_SUCCESS, REMOVE_SESSION } from '../constants'

/**
 * Update certain parts of state in local storage
 * @param store
 * @returns {function(*): Function}
 */
const sessionPersist = store => next => action => {
  // Get existing session from localStorage
  let localState = localStorage.getItem('session-token')

  // If exist parse the JSON to an object
  if (localState && typeof JSON.parse(localState) === 'object') {
    localState = JSON.parse(localState)
  } else {
    localState = Object.assign({}, action.payload)
  }

  switch (action.type) {
    case FETCH_SESSION_SUCCESS:
    case FETCH_REFRESH_SESSION_SUCCESS:
      localStorage.setItem('session-token', JSON.stringify(localState))
      break
    case REMOVE_SESSION:
      localStorage.removeItem('session-token')
      break

    default:
      return next(action)
  }

  return next(action)
}

export default sessionPersist
