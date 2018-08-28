/**
 * Description: Credentials services
 *
 * The service expose a set of interface to deal with credential services such as:
 * - getting a credentials entity based on json schema,
 * - validating credentials based on json schema,
 * - remote XHR calls to getting access token and refresh access tokens,
 * - setting and removing authorization headers with access token.
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
import Entity from './entity/Entity'

// Schema based entity
const CredentialsEntity = new Entity(credentialSchema);

// XHR instance
const XHR = XHRService.getInstance();

// Oauth 2 variables
const API_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

/**
 * Get credentials schema
 * @returns {object} - credentials json schema
 */
function getSchema() {
  return credentialSchema;
}

/**
 * Get credentials default entity
 * @returns {object} - credentials default entity
 */
function getEntity() {
  return CredentialsEntity.getEntity();
}

/**
 * Validate credentials entity
 * @param {object} credentials - credentials entity
 * @returns {object} - credentials entity of no error otherwise entity validation exception
 */
function validate(credentials) {
  return CredentialsEntity.isValid(credentials);
}

/**
 * Post credentials to get an access token
 * @param {object} credentials - entity object
 * @returns {Promise<AxiosResponse<any> | never | never>}
 */
function postCredentials(credentials) {
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
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Post a refresh token to retrieve new access token
 * @param {string} refresh_token - refresh token used to get a new access token
 * @returns {Promise<AxiosResponse<any> | never | never>}
 */
function postRefreshToken(refresh_token) {
  let body = "refresh_token=" +
    encodeURIComponent(refresh_token) +
    "&client_id=" +
    encodeURIComponent(API_CLIENT_ID) +
    "&grant_type=" +
    encodeURIComponent("refresh_token");

  return XHR.post("/oauth/tokens", body)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Set access token to the authorization header of the XHR service
 * The header is used for all API services after it is set as long as
 * the user is still logged in.
 * @param {object} token - access token
 */
function setAuthorizationHeader(token) {
  XHRService.setAuthorizationHeader(token);
}

/**
 * Remove authorization header (access token) from XHR service
 * Is used when logging out
 */
function removeAuthorizationHeader() {
  XHRService.removeAuthorizationHeader();
}

/**
 * Factory for credentials service interface
 * @constructor
 */
function CredentialsServiceFactory() {
  return {
    getSchema,
    getEntity,
    validate,
    postCredentials,
    postRefreshToken,
    setAuthorizationHeader,
    removeAuthorizationHeader,
  };
}

// Export a new instance exposing the interface
export default new CredentialsServiceFactory();
