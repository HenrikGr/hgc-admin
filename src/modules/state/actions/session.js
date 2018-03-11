/**
 * Description
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
  type: "FETCH_SESSION_STARTED"
});

const fetchComplete = json => ({
  type: "FETCH_SESSION_COMPLETE",
  json
});

const fetchFailed = error => ({
  type: "FETCH_SESSION_FAILED",
  error
});

export function getAccessToken(username, password) {
  return function(dispatch, getState) {
    dispatch(fetchBegin("Get access token"));
    dispatch(fetchStart());
    return API.getAccessToken(username, password)
      .then(json => {
        dispatch(fetchComplete(json));
      })
      .catch(json => {
        dispatch(fetchFailed(json));
      });
  };
}

/**
 * Action creator to extend session fetching a new access token
 * @returns {Function}
 */
export function refreshAccessToken() {
  return function(dispatch, getState) {
    const { refresh_token } = getState().session;
    dispatch(fetchBegin("Refresh access token"));
    dispatch(fetchStart());
    return API.refreshAccessToken(refresh_token)
      .then(json => {
        dispatch(fetchComplete(json));
      })
      .catch(json => {
        dispatch(fetchFailed(json));
      });
  };
}

/**
 * Action creator used after authentication
 * @param token
 * @returns {{type: string, token: *}}
 */
export function setToken(token) {
  return {
    type: "SET_SESSION",
    token
  };
}

/**
 * Remove token from session
 * @returns {{type: string, token: {}}}
 */
export function removeAccessToken() {
  return {
    type: "REMOVE_SESSION",
    token: {}
  };
}
