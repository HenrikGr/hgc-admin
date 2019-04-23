/**
 * @prettier
 * @description: Profile reducer
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import defaults from '../DefaultState'
import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_STATE
} from '../constants'

/**
 * Profile reducer
 * @param state
 * @param action
 * @returns {*}
 */
const profileReducer = (state = defaults.profile, action) => {
  switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
    case FETCH_PROFILE_UPDATE_SUCCESS:
      return action.payload

    case PROFILE_UPDATE_STATE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export default profileReducer
