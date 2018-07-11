/**
 * Description: Module containing action creators for the session state.
 *
 * The session actions consist of two remote CRUD operations to create and refresh session
 * information to the state.
 *
 * There is also helpers action creators that describe the new state that should be set
 * during the remote calls in case of start, success or failure.
 *
 * The remote calls using session service module that contains business logic
 * for session information, for example validation of data and CRUD XHR calls
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Business logic for session data
import { sessionService } from '../../domain/service/Session';

/**
 * Helper action creator to be used when there is a client validation error
 * @param error
 * @returns {{type: string, error: *}}
 */
const validationFailed = error => ({
  type: "CREDENTIALS_FAILED",
  error
});

/**
 * Helper action creator to be used when starting remote call getSession
 * @param isFetching
 * @returns {{type: string, isFetching: *}}
 */
const getSessionStart = isFetching => ({
  type: "GET_SESSION_START",
  isFetching
});

/**
 * Helper action creator to be used when remote call getSession succeed.
 * @param json
 * @returns {{type: string, json: *}}
 */
const getSessionComplete = json => ({
  type: "GET_SESSION_COMPLETE",
  json
});

/**
 * Helper action creator to be used when remote call getSession fails
 * @param error
 * @returns {{type: string, error: *}}
 */
const getSessionFailed = error => ({
  type: "GET_SESSION_FAILED",
  error
});

/**
 * Helper function to reset the session object
 * @returns {{type: string}}
 */
const resetSession = () => ({
  type: "RESET_SESSION",
});

/**
 * Action creator - fetching session information, aka access_token
 * @param credentials
 * @returns {Function}
 */
const getSession = (credentials) => {
  return function(dispatch) {
    const error = sessionService.validateCredentials(credentials);
    if (error.message) {
      dispatch(validationFailed(error));
    } else {
      dispatch(getSessionStart(true));
      return sessionService.getSession(credentials).then(json => {
        dispatch(getSessionComplete(json))
      }).catch(err => {
        dispatch(getSessionFailed(err))
      })
    }
  }
};

/**
 * Action creator - fetching session information via refresh_token
 * @returns {function(*, *): Promise<T>}
 */
const refreshSession = () => {
  return function(dispatch, getState) {
    const { refresh_token } = getState().session;
    dispatch(getSessionStart(true));
    return sessionService.refreshSession(refresh_token).then(json => {
      dispatch(getSessionComplete(json))
    }).catch(err => {
      dispatch(getSessionFailed(err))
    })
  }
};

/**
 * Action creator that removes session information from session state
 * and from session service module
 * @returns {Function}
 */
const removeSession = () => {
  sessionService.removeSession();
  return {
    type: "REMOVE_SESSION",
  };
};

/**
 * Exposed session interface
 * @constructor
 */
export const SessionActionFactory = () => {
  return {
    getSession,
    refreshSession,
    removeSession,
    resetSession,
  }
};

// Export interface
export default SessionActionFactory();