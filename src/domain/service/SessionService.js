/**
 * Description: Session services
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Import fetch helper functions.
import validator from "../../utils/validator";
import XHRService, {errorHandler} from "./XHRService";
const XHR = XHRService.getInstance();

// Oauth 2 variables
const API_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

/**
 * Validate session credentials
 * @param username
 * @param password
 * @returns {*}
 */
const validateCredentials = (username, password) => {
  return validator.validate({ username: username, password: password });
};

/**
 * Get a new session
 * @param username
 * @param password
 * @returns {Promise<T>}
 */
const getSession = (username, password) => {
  let body = "username=" +
    encodeURIComponent(username) +
    "&password=" +
    encodeURIComponent(password) +
    "&client_id=" +
    encodeURIComponent(API_CLIENT_ID) +
    "&grant_type=" +
    encodeURIComponent("password");

  return XHR.post("/oauth/tokens", body)
    .then(response => {
      XHRService.setAuthorizationHeader(response.data);
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * Refresh/extend session
 * @param refresh_token
 * @returns {Promise<T>}
 */
const refreshSession = (refresh_token) => {
  let body = "refresh_token=" +
    encodeURIComponent(refresh_token) +
    "&client_id=" +
    encodeURIComponent(API_CLIENT_ID) +
    "&grant_type=" +
    encodeURIComponent("refresh_token");

  return XHR.post("/oauth/tokens", body)
    .then(response => {
      XHRService.setAuthorizationHeader(response.data);
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * Remove session
 */
const removeSession = () => {
  XHRService.removeAuthorizationHeader();
};

/**
 * Export session service methods
 * @returns {{
 * validateCredentials: function(*=, *=): *,
 * createPasswordGrantBody: function(*=, *=),
 * createRefreshTokenBody: function(*=),
 * getSession: function(*=)
 * }}
 * @constructor
 */
export const SessionServiceFactory = () => {
  return {
    validateCredentials,
    getSession,
    refreshSession,
    removeSession,
  };
};

export const sessionService =  SessionServiceFactory();
