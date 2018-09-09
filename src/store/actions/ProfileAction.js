/**
 * @prettier
 * @description: Profile action creator services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import profileSchemaService from '../../domain/schemas/Profile'
import profileService from '../../domain/service/Profile'
import {
  VALIDATION_ERROR,
  FETCH_VALIDATION_ERROR,
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET_ERROR,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_STATE
} from '../actions/constants'

/**
 * Helper function to validate data via profileService API
 * @param {object} json - json object returned from profileService API
 * @returns {Function}
 * @private
 */
function fetchValidate(json) {
  return dispatch => {
    const error = profileSchemaService.validate(json)
    if (error.message) {
      dispatch({ type: FETCH_VALIDATION_ERROR, payload: error })
      return Promise.reject(error)
    } else {
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_PROFILE_SUCCESS, payload: json })
      return Promise.resolve(json)
    }
  }
}

/**
 * Get profile information for the current user via profile service API
 * @returns {function(*): Promise<T | never>}
 * @public
 */
function getMe() {
  return async dispatch => {
    try {
      dispatch({ type: FETCH_START })
      const json = await profileService.getMe()
      return dispatch(fetchValidate(json))
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error })
      return Promise.reject(error)
    }
  }
}

/**
 * Update profile information via profile service API
 * @param {object} profile - profile entity
 * @returns {Function}
 * @public
 */
function update(profile) {
  return async dispatch => {
    const error = profileSchemaService.validate(profile)
    if (error.message) {
      dispatch({ type: VALIDATION_ERROR, payload: error })
      return Promise.reject(error)
    } else {
      try {
        dispatch({ type: FETCH_START })
        const json = await profileService.updateMe(profile)
        return dispatch(fetchValidate(json))
      } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error })
        return Promise.reject(error)
      }
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
  return { type: UPDATE_PROFILE_STATE, payload: value }
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
