/**
 * @prettier
 * @description: SessionEntity action creator services
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { sessionMgr, profileMgr } from '../../domain/entity'
import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SESSION_SUCCESS,
  FETCH_REFRESH_SESSION_SUCCESS,
  FETCH_PROFILE_SUCCESS,
  REMOVE_SESSION
} from '../constants'

/**
 * Log in user
 * @param {Object} credentials - user credentials
 * @param {string} credentials.username - username
 * @param {string} credentials.password - password
 * @returns {Function} - an async thunk middleware function that can dispatch a series of action creators
 */
export function logIn({ username, password }) {
  return async function(dispatch) {
    try {
      dispatch({ type: FETCH_START })
      const session = await sessionMgr.createSession(username, password)
      const profile = await profileMgr.findOrCreateMe()
      dispatch({ type: FETCH_SESSION_SUCCESS, payload: session })
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: profile })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Refreshing the user session
 * @returns {Function} - an async thunk middleware function that can dispatch a series of action creators
 */
export function refreshSession() {
  return async function(dispatch) {
    dispatch({ type: FETCH_START })
    const token = await sessionMgr.refreshSession()
    dispatch({ type: FETCH_REFRESH_SESSION_SUCCESS, payload: token })
  }
}

/**
 * Log out user
 * @returns {Function} - an thunk middleware function that can dispatch a series of action creators
 */
export function logOut() {
  return function(dispatch) {
    const session = sessionMgr.deleteSession()
    dispatch({ type: REMOVE_SESSION, payload: session })
  }
}
