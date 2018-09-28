/**
 * @prettier
 * @description: Profile action creator services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
//import API from '../../domain/service/xhr/Profile'
import API from '../../domain/service/Profile'
import {
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET_ERROR,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_STATE
} from '../actions/constants'

/**
 * Get profile information for the current user via profile service API
 * @returns {function(*): Promise<T | never>}
 * @public
 */
function getMe() {
  return dispatch => {
    dispatch({ type: FETCH_START })
    return API.getMe()
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: FETCH_PROFILE_SUCCESS, payload: json })
        return Promise.resolve(json)
      })
      .catch(error => {
        dispatch({ type: FETCH_ERROR, payload: error })
        return Promise.reject(error)
      })
  }
}

/**
 * Update profile information via profile service API
 * @returns {Function}
 * @public
 */
function update() {
  return (dispatch, getState) => {
    const { profile } = getState().user
    dispatch({ type: FETCH_START })
    return API.updateMe(profile)
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: FETCH_PROFILE_UPDATE_SUCCESS, payload: json })
      })
      .catch(error => {
        dispatch({ type: FETCH_ERROR, payload: error })
      })
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

/**
 * Interface constructor for profile action creators
 * @constructor
 * @private
 */
function ProfileActionFactory() {
  return {
    getMe,
    update,
    updateState,
    resetError
  }
}

export default new ProfileActionFactory()
