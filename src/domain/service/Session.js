/**
 * Description: Session business logic module
 *
 * Session service exposes a set of function representing business logic for session data.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// XHR service
import XHRService, { errorHandler } from "./XHRService";

// Schema services
import CredentialSchema from '../../domain/schemas/SessionSchema';


// XHR instance
const XHR = XHRService.getInstance();

// Oauth 2 variables
const API_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;


/**
 * Validate a profile object
 * @param credentials
 * @returns {{message: string}}
 */
function validateCredentials(credentials) {
  return CredentialSchema.isValid(credentials);
}


/**
 * Get a new session
 * @param credentials
 * @returns {Promise<T>}
 */
function getSession(credentials) {
  let body = "username=" +
    encodeURIComponent(credentials.username) +
    "&password=" +
    encodeURIComponent(credentials.password) +
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
}

/**
 * Refresh/extend session
 * @param refresh_token
 * @returns {Promise<T>}
 */
function refreshSession(refresh_token) {
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
}

/**
 * Remove session
 */
function removeSession() {
  XHRService.removeAuthorizationHeader();
}

/**
 * Export session service methods
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

export const sessionService = SessionServiceFactory();
