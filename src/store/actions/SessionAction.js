/**
 * Description: Module containing action creators for the session state branch.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Credentials services
import credentialsService from '../../domain/service/Credentials';

// Actions
import {
  LOG_STATUS,
  CREDENTIALS_VALIDATION_FAILED,
  FETCH_SESSION_START,
  FETCH_SESSION_FAILED,
  GET_SESSION_SUCCESS,
  REFRESH_SESSION_SUCCESS,
  PASSWORD_VISIBLE,
  UPDATE_CREDENTIALS_STATE,
  RESET_SESSION_ERROR,
  REMOVE_SESSION,
} from '../actions/constants'

/**
 * Get a session token based on the credentials
 * @param {object} credentials - credential object
 * @returns {Function}
 */
function getSession(credentials) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Start get session" });
    const error = credentialsService.validate(credentials);
    if (error.message) {
      dispatch({ type: CREDENTIALS_VALIDATION_FAILED, payload: error } );
    } else {
      dispatch({ type: FETCH_SESSION_START });
      credentialsService.postCredentials(credentials).then(token => {
        credentialsService.setAuthorizationHeader(token);
        dispatch({ type: GET_SESSION_SUCCESS, payload: token })
      }).catch(err => {
        dispatch({ type: FETCH_SESSION_FAILED, payload: err })
      })
    }
  }
}

/**
 * Refresh a session by posting the refresh_token from current session
 * @returns {Function}
 */
function refreshSession() {
  return function(dispatch, getState) {
    dispatch({ type: LOG_STATUS, payload: "Start refresh session" });
    const { refresh_token } = getState().session.token;
    dispatch({ type: FETCH_SESSION_START });
    credentialsService.postRefreshToken(refresh_token).then(token => {
      credentialsService.setAuthorizationHeader(token);
      dispatch({ type: REFRESH_SESSION_SUCCESS, payload: token })
    }).catch(err => {
      dispatch({ type: FETCH_SESSION_FAILED, payload: err })
    })
  }
}

/**
 * Action creator to toggle visible password
 * @returns {{type: string}}
 */
function togglePasswordVisible() {
  return { type: PASSWORD_VISIBLE }
}

/**
 * Store credentials entered in login fom
 * @param {string} value - character entered in credentials input
 * @returns {{type: string, payload: *}}
 */
function updateCredentials(value) {
  return { type: UPDATE_CREDENTIALS_STATE, payload: value }
}

/**
 * Reset validation errors from state
 * @returns {{type: string}}
 */
function resetSessionError() {
  return { type: RESET_SESSION_ERROR }
}

/**
 * Removes session information from session state
 * It will also remove the authorization header
 * @returns {{type: string}}
 */
function removeSession() {
  credentialsService.removeAuthorizationHeader();
  return { type: REMOVE_SESSION };
}

/**
 * Factory for session actions interface
 * @constructor
 */
function SessionActionFactory() {
  return {
    getSession,
    refreshSession,
    togglePasswordVisible,
    updateCredentials,
    removeSession,
    resetSessionError,
  }
}

// Export interface
export default new SessionActionFactory();