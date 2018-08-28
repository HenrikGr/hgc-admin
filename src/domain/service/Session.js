/**
 * Description: Session API service
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// XHR service
import XHRService, { errorHandler } from "./XHRService";

// Credentials schema
import credentialSchema from '../schemas/json/credentials'

// Base entity model
import EntityModel from './entity/EntityModel'

// XHR instance
const XHR = XHRService.getInstance();

// Entity model instance
const CredentialsEntityModel = new EntityModel(credentialSchema);

// Oauth 2 variables
const API_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

/**
 * Get schema
 * @returns {*}
 */
function getSchema() {
  return CredentialsEntityModel.getSchema();
}

/**
 * Get credentials entity model
 * @returns {*}
 */
function getEntityModel() {
  return CredentialsEntityModel.getDefaultEntity();
}

/**
 * Validate credentials entity
 * @param {object} credentials - credentials entity
 * @returns {object} - either error object or credential entity
 */
function validateCredentials(credentials) {
  return CredentialsEntityModel.isValid(credentials);
}

/**
 * Get a new session
 * @param {object} credentials - entity object for credentials
 * @returns {Promise<AxiosResponse<any> | never | never>}
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
 * @returns {Promise<AxiosResponse<any> | never | never>}
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
function SessionServiceFactory() {
  return {
    getSchema,
    getEntityModel,
    validateCredentials,
    getSession,
    refreshSession,
    removeSession,
  };
}

export default new SessionServiceFactory();
