/**
 * Description: Module containing action creators for the profile state.
 *
 * The profile actions consist of two remote CRUD operations to retrieve and update profile
 * information to the state.
 *
 * There is also helpers action creators that describe the new state that should be set
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
import profileService from "../../domain/service/Profile";

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
 * Helper action creator to be used when starting remote call getUsers
 * @param isFetching
 * @returns {{type: string, isFetching: *}}
 */
const fetchStart = (isFetching) => ({
  type: "FETCH_PROFILE_STARTED",
  isFetching
});

/**
 * Helper action creator to be used when remote call getUsers fails
 * @param error
 * @returns {{type: string, error: *}}
 */
const fetchFailed = error => ({
  type: "FETCH_PROFILE_FAILED",
  error
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
 * Helper action creator to be used when remote call updateProfile succeed.
 * @param json
 * @returns {{type: string, json: *}}
 */
const updateProfileComplete = json => ({
  type: "UPDATE_PROFILE_COMPLETE",
  json
});

/**
 * Action creator - fetching profile information
 * @returns {Function}
 */
const getProfile = () => {
  return (dispatch) => {
    dispatch(fetchStart(true));
    return profileService.findOrCreate()
      .then(json => {
        const error = profileService.validateProfile(json);
        if (error.message) {
          dispatch(validationFailed(error));
        } else {
          dispatch(getProfileComplete(json));
        }
      })
      .catch(err => {
        dispatch(fetchFailed(err));
      });
  };
};

/**
 * Action creator - update profile information
 * @param profile
 * @returns {Function}
 */
const updateProfile = profile => {
  return (dispatch) => {
    const error = profileService.validateProfile(profile);
    if (error.message) {
      dispatch(validationFailed(error));
    } else {
      dispatch(fetchStart(true));
      return profileService.updateProfile(profile)
        .then(json => {
          const error = profileService.validateProfile(json);
          if (error.message) {
            dispatch(validationFailed(error));
          } else {
            dispatch(updateProfileComplete(json));
          }
        })
        .catch(error => {
          dispatch(fetchFailed(error));
        });
    }
  };
};

/**
 * Action creator to be used when update input fields of the profile
 * @param value
 * @returns {{type: string, value: *}}
 */
const handleChange = value => ({
  type: "HANDLE_CHANGE_PROFILE",
  value
});

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
    updateProfile,
    handleChange
  };
};

// Export interface
export default ProfileActionFactory();
