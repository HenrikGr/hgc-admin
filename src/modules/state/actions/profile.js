/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import API from "../../api";

const fetchBegin = status => ({
  type: "FETCH_BEGIN",
  status
});

const fetchStart = () => ({
  type: "FETCH_PROFILE_STARTED"
});

const fetchComplete = json => ({
  type: "FETCH_PROFILE_COMPLETE",
  json
});

const fetchFailed = error => ({
  type: "FETCH_PROFILE_FAILED",
  error
});

/**
 * Action creator to get profile
 * @returns {Function}
 */
export function getProfile() {
  return function(dispatch, getState) {
    const { access_token } = getState().session;
    dispatch(fetchBegin("Get profile information"));
    dispatch(fetchStart());
    API.getProfile(access_token)
      .then(json => {
        dispatch(fetchComplete(json));
      })
      .catch(json => {
        dispatch(fetchFailed(json));
      });
  };
}

/**
 * Action creator to update profile
 * @param email
 * @param firstName
 * @param lastName
 * @param phone
 * @returns {Function}
 */
export function updateProfile(email, firstName, lastName, phone) {
  return function(dispatch, getState) {
    const { access_token } = getState().session;
    dispatch(fetchBegin("Update profile information"));
    dispatch(fetchStart());
    return API.updateProfile(email, firstName, lastName, phone, access_token)
      .then(response => {
        dispatch(fetchComplete(response));
      })
      .catch(error => {
        dispatch(fetchFailed(error));
      });
  };
}
