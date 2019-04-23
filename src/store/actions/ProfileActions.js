/**
 * @prettier
 * @description: Profile action creator services
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { profileMgr } from '../../domain/entity'
import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET_ERROR,
  FETCH_PROFILE_SUCCESS,
  PROFILE_UPDATE_STATE
} from '../constants'


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
      const response = await profileMgr.updateMe(profile)
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
