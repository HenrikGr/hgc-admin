/**
 * @prettier
 * @description: Profile action creators
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import ProfileAPI from '../../domain/xhr/ProfileAPI'
import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET_ERROR,
  FETCH_PROFILE_SUCCESS,
  PROFILE_UPDATE_STATE
} from '../constants'

/**
 * Profile API instance
 * @type {ProfileAPI}
 */
const profileAPI = new ProfileAPI()

/**
 * Update profile information via profile xhr API
 * @returns {Function}
 * @public
 */
function updateMe() {
  return async (dispatch, getState) => {
    try {
      const { profile } = getState()
      dispatch({ type: FETCH_START })
      const response = await profileAPI.updateMe(profile)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator to be used when update input fields of the profile
 * @param {string} value - character entered in input fields
 * @returns {{type: string, payload: *}}
 * @public
 */
function updateState(value) {
  return { type: PROFILE_UPDATE_STATE, payload: value }
}

/**
 * Reset error messages
 * @returns {{type: string}}
 * @public
 */
function resetError() {
  return { type: RESET_ERROR }
}

export default {
  updateMe,
  updateState,
  resetError
}
