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
import sessionService from '../../domain/service/Session';

/**
 * Helper action creator to be used when there is a client validation error
 * @param {object} error - ValidationError object
 * @returns {{type: string, error: object}}
 */
const validationFailed = error => ({
  type: "CREDENTIALS_VALIDATION_FAILED",
  error
});

/**
 * Helper action creator to be used when starting remote call getSession
 * @returns {{type: string}}
 */
const fetchSessionStart = () => ({
  type: "FETCH_SESSION_START",
});

/**
 * Helper action creator to be used when remote call getSession fails
 * @param error
 * @returns {{type: string, error: *}}
 */
const fetchSessionFailed = error => ({
  type: "FETCH_SESSION_FAILED",
  error
});

/**
 * Helper action creator to be used when remote call getSession succeed.
 * @param json
 * @returns {{type: string, json: *}}
 */
const fetchSessionComplete = json => ({
  type: "FETCH_SESSION_COMPLETE",
  json
});

/**
 * Action creator - fetching session information, aka access_token
 * @param {object} credentials - credential object
 * @returns {Function}
 */
const getSession = credentials => {
  return function(dispatch) {
    const error = sessionService.validateCredentials(credentials);
    if (error.message) {
      dispatch(validationFailed(error));
    } else {
      dispatch(fetchSessionStart());
      sessionService.getSession(credentials).then(json => {
        dispatch(fetchSessionComplete(json))
      }).catch(err => {
        dispatch(fetchSessionFailed(err))
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
    const { refresh_token } = getState().session.token;
    dispatch(fetchSessionStart(true));
    sessionService.refreshSession(refresh_token).then(json => {
      dispatch(fetchSessionComplete(json))
    }).catch(err => {
      dispatch(fetchSessionFailed(err))
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
 * Action creator to be used when update input fields of the profile
 * @param value
 * @returns {{type: string, value: *}}
 */
const handleChange = value => ({
  type: "HANDLE_CHANGE_CREDENTIALS",
  value
});

const toggleShowPassword = show => ({
  type: "SHOW_PASSWORD",
  show
});

/**
 * Action creator to reset error messages
 */
const resetError = () => ({
  type: "RESET_ERROR"
});

/**
 * Exposed session interface
 * @constructor
 */
function SessionActionFactory() {
  return {
    getSession,
    refreshSession,
    removeSession,
    handleChange,
    resetError,
    toggleShowPassword,
  }
}

// Export interface
export default new SessionActionFactory();