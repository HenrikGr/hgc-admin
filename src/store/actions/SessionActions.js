/**
 * @prettier
 * @description: Session action creators
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import SessionAPI from '../../domain/xhr/SessionAPI'
import ProfileAPI from '../../domain/xhr/ProfileAPI'
import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SESSION_SUCCESS,
  FETCH_REFRESH_SESSION_SUCCESS,
  FETCH_PROFILE_SUCCESS,
  REMOVE_SESSION
} from '../constants'

/**
 * Session API instance
 * @type {SessionAPI}
 */
const sessionAPI = new SessionAPI()

/**
 * Profile API instance
 * @type {ProfileAPI}
 */
const profileAPI = new ProfileAPI()

/**
 * Log in user
 * @param {Object} credentials - user credentials
 * @param {String} credentials.username - username
 * @param {String} credentials.password - password
 * @returns {Function} - async thunk middleware function that creates a session and find or update a profile
 * @public
 */
export function logIn({ username, password }) {
  return async function(dispatch) {
    try {
      dispatch({ type: FETCH_START })
      const session = await sessionAPI.createSession(username, password)
      //const profile = await profileAPI.findOrCreateMe()
      dispatch({ type: FETCH_SESSION_SUCCESS, payload: session })
      //dispatch({ type: FETCH_PROFILE_SUCCESS, payload: profile })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Refreshing the user session
 * @returns {Function} - an async thunk middleware function that can dispatch a series of action creators
 * @public
 */
export function refreshSession() {
  return async function(dispatch) {
    try {
      dispatch({ type: FETCH_START })
      const token = await sessionAPI.refreshSession()
      dispatch({ type: FETCH_REFRESH_SESSION_SUCCESS, payload: token })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Log out user
 * @returns {Function} - an thunk middleware function that can dispatch a series of action creators
 */
export function logOut() {
  return function(dispatch) {
    const session = sessionAPI.removeSession()
    dispatch({ type: REMOVE_SESSION, payload: session })
  }
}
