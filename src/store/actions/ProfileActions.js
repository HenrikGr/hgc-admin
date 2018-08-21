/**
 * Description: Module containing action creators for the profile state.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Profile XHR services
import profileService from "../../domain/service/Profile";
import {
  PROFILE_VALIDATION_FAILED,
  FETCH_PROFILE_STARTED,
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_STATE,
  RESET_PROFILE_ERROR
} from '../actions/constants';

/**
 * Action creator - fetching profile information
 * @returns {function(*): Promise<T | never>}
 */
function getProfile() {
  return (dispatch) => {
    dispatch({ type: FETCH_PROFILE_STARTED });
    return profileService.findOrCreate()
      .then(json => {
        const error = profileService.validateProfile(json);
        if (error.message) {
          dispatch({ type: PROFILE_VALIDATION_FAILED, payload: error});
        } else {
          dispatch({ type: FETCH_PROFILE_SUCCESS, payload: json });
        }
      })
      .catch(err => {
        dispatch({ type: FETCH_PROFILE_FAILED, payload: err });
      });
  };
}

/**
 * Action creator - update profile information
 * @param {object} profile - profile entity
 * @returns {Function}
 */
function updateProfile(profile) {
  return (dispatch) => {
    const error = profileService.validateProfile(profile);
    if (error.message) {
      dispatch({ type: PROFILE_VALIDATION_FAILED, payload: error});
    } else {
      dispatch({ type: FETCH_PROFILE_STARTED });
      return profileService.updateProfile(profile)
        .then(json => {
          const error = profileService.validateProfile(json);
          if (error.message) {
            dispatch({ type: PROFILE_VALIDATION_FAILED, payload: error});
          } else {
            dispatch({ type: FETCH_PROFILE_SUCCESS, payload: json });
          }
        })
        .catch(err => {
          dispatch({ type: FETCH_PROFILE_FAILED, payload: err });
        });
    }
  };
}

/**
 * Action creator to be used when update input fields of the profile
 * @param {string} value - character entered in input fields
 * @returns {{type: string, payload: *}}
 */
function updateProfileState(value) {
  return { type: UPDATE_PROFILE_STATE, payload: value }
}

/**
 * Action creator to reset error messages
 * @returns {{type: string}}
 */
function resetProfileError() {
  return { type: RESET_PROFILE_ERROR }
}

/**
 * Factory for profile interface
 * @constructor
 */
function ProfileActionFactory() {
  return {
    getProfile,
    updateProfile,
    updateProfileState,
    resetProfileError
  };
}

// Export interface
export default new ProfileActionFactory();
