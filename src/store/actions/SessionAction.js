/**
 * Description: Module containing action creators for the session state branch.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Business logic for session data
import sessionService from '../../domain/service/Session';
import {
  CREDENTIALS_VALIDATION_FAILED,
  FETCH_SESSION_START,
  FETCH_SESSION_FAILED,
  FETCH_SESSION_SUCCESS,
  PASSWORD_VISIBLE,
  UPDATE_CREDENTIALS,
  RESET_SESSION_ERROR,
  REMOVE_SESSION,
} from '../actions/constants'

/**
 * Action creator - fetching session information, aka access_token
 * @param {object} credentials - credential object
 * @returns {Function}
 */
function getSession(credentials) {
  return function(dispatch) {
    const error = sessionService.validateCredentials(credentials);
    if (error.message) {
      dispatch({ type: CREDENTIALS_VALIDATION_FAILED, payload: error } );
    } else {
      dispatch({ type: FETCH_SESSION_START });
      sessionService.getSession(credentials).then(json => {
        dispatch({ type: FETCH_SESSION_SUCCESS, payload: json })
      }).catch(err => {
        dispatch({ type: FETCH_SESSION_FAILED, payload: err })
      })
    }
  }
}

/**
 * Action creator - fetching session information via refresh_token
 * @returns {Function}
 */
function refreshSession() {
  return function(dispatch, getState) {
    // Get refresh token from state
    const { refresh_token } = getState().session.token;
    dispatch({ type: FETCH_SESSION_START });
    sessionService.refreshSession(refresh_token).then(json => {
      dispatch({ type: FETCH_SESSION_SUCCESS, payload: json })
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
 * Action creator to store credentials updates in state
 * @param {string} value - character entered in credentials input
 * @returns {{type: string, payload: *}}
 */
function updateCredentials(value) {
  return { type: UPDATE_CREDENTIALS, payload: value }
}

/**
 * Action creator to reset error messages
 * @returns {{type: string}}
 */
function resetSessionError() {
  return { type: RESET_SESSION_ERROR }
}

/**
 * Action creator that removes session information from session state
 * It will also remove the access token from the XHR service
 * @returns {{type: string}}
 */
function removeSession() {
  sessionService.removeSession();
  return { type: REMOVE_SESSION };
}

/**
 * Factory for session action interface
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