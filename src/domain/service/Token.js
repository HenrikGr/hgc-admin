/**
 * @prettier
 * @description: Session services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import XHRService, { errorHandler } from './XHRService'
const API_CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const XHR = XHRService.getInstance()

/**
 * Post credentials to get an access token
 * @param {object} credentials - entity object
 * @returns {Promise<AxiosResponse<any> | never | never>}
 * @public
 */
function get(credentials) {
  let body =
    'username=' +
    encodeURIComponent(credentials.username) +
    '&password=' +
    encodeURIComponent(credentials.password) +
    '&client_id=' +
    encodeURIComponent(API_CLIENT_ID) +
    '&grant_type=' +
    encodeURIComponent('password')

  return XHR.post('/oauth/tokens', body)
    .then(response => {
      setAuthorizationHeader(response.data)
      return Promise.resolve(response.data)
    })
    .catch(error => {
      removeAuthorizationHeader()
      return Promise.reject(errorHandler(error))
    })
}

/**
 * Post a refresh token to retrieve new access token
 * @param {string} refresh_token - refresh token used to get a new access token
 * @returns {Promise<AxiosResponse<any> | never | never>}
 * @public
 */
function refresh(refresh_token) {
  let body =
    'refresh_token=' +
    encodeURIComponent(refresh_token) +
    '&client_id=' +
    encodeURIComponent(API_CLIENT_ID) +
    '&grant_type=' +
    encodeURIComponent('refresh_token')

  return XHR.post('/oauth/tokens', body)
    .then(response => {
      setAuthorizationHeader(response.data)
      return Promise.resolve(response.data)
    })
    .catch(error => {
      removeAuthorizationHeader()
      return Promise.reject(errorHandler(error))
    })
}

/**
 * Set access token to the authorization header of the XHR service
 * The header is used for all API services after it is set as long as
 * the user is still logged in.
 * @param {object} token - access token
 */
function setAuthorizationHeader(token) {
  XHRService.setAuthorizationHeader(token)
}

/**
 * Remove authorization header (access token) from XHR service
 * Is used when logging out
 */
function removeAuthorizationHeader() {
  XHRService.removeAuthorizationHeader()
}

/**
 * Remove token
 * @public
 */
function remove() {
  XHRService.removeAuthorizationHeader()
}

/**
 * Factory for credentials service interface
 * @constructor
 * @public
 */
const TokenServiceFactory = () => {
  return {
    get,
    refresh,
    remove
  }
}

export default new TokenServiceFactory()
