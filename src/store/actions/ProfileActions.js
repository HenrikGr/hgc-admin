/**
 * Description: Module containing action creators for the profile state.
 *
 * The profile actions consist of two remote CRUD operations to retrieve and update profile
 * information to the state.
 *
 * There is also helper action creators that describe the new state that should be set
 * during the remote calls in case of start, success or failure.
 *
 * The remote calls using profile service module that contains business logic
 * for profile information, for example validation of data and CRUD XHR calls
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Business logic for profile data
import profileService from "../../domain/service/ProfilesService";

/**
 * Helper action creator to be used when there is a client validation error
 * @param error
 * @returns {{type: string, error: *}}
 */
const validationFailed = error => ({
  type: "PROFILE_VALIDATION_FAILED",
  error
});

/**
 * Helper action creator to be used when starting remote call getProfile
 * @param isFetching
 * @returns {{type: string, isFetching: *}}
 */
const getProfileStart = isFetching => ({
  type: "GET_PROFILE_START",
  isFetching
});

/**
 * Helper action creator to be used when remote call getProfile succeed.
 * @param json
 * @returns {{type: string, json: *}}
 */
const getProfileComplete = json => ({
  type: "GET_PROFILE_COMPLETE",
  json
});

/**
 * Helper action creator to be used when remote call getProfile fails
 * @param error
 * @returns {{type: string, error: *}}
 */
const getProfileFailed = error => ({
  type: "GET_PROFILE_FAILED",
  error
});

/**
 * Helper action creator to be used when starting remote call updateProfile
 * @param isFetching
 * @returns {{type: string, isFetching: *}}
 */
const updateProfileStart = isFetching => ({
  type: "UPDATE_PROFILE_START",
  isFetching
});

/**
 * Helper action creator to be used when remote call updateProfile succeed.
 * @param json
 * @returns {{type: string, json: *}}
 */
const updateProfileComplete = json => ({
  type: "UPDATE_PROFILE_COMPLETE",
  json
});

/**
 * Helper action creator to be used when remote call updateProfile fails
 * @param error
 * @returns {{type: string, error: *}}
 */
const updateProfileFailed = error => ({
  type: "UPDATE_PROFILE_FAILED",
  error
});

/**
 * Action creator - fetching profile information
 * @returns {Function}
 */
const getProfile = () => {
  return function(dispatch) {
    dispatch(getProfileStart(true));
    return profileService.getProfile()
      .then(json => {
        dispatch(getProfileComplete(json));
      })
      .catch(err => {
        dispatch(getProfileFailed(err));
      });
  };
};

/**
 * Action creator - update profile information
 * @param profile
 * @returns {Function}
 */
const updateProfile = profile => {
  return function(dispatch, getState) {
    const state = getState().profile;
    if (profileService.hasChanged(state, profile)) {
      const isValid = profileService.validateProfile(profile);
      if (isValid.error) {
        dispatch(validationFailed(isValid.error));
      } else {
        dispatch(updateProfileStart(true));
        return profileService.updateProfile(profile)
          .then(response => {
            dispatch(updateProfileComplete(response));
          })
          .catch(error => {
            dispatch(updateProfileFailed(error));
          });
      }
    }
  };
};

/**
 * Exposed profile action interface
 * @returns {{
 * getProfile: function(): function(*): (Promise<T> | *),
 * updateProfile: function(*=): Function
 * }}
 * @constructor
 */
export const ProfileActionFactory = () => {
  return {
    getProfile,
    updateProfile
  };
};

// Export interface
export default ProfileActionFactory();
