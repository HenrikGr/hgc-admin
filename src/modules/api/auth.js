/**
 * Description: Client side API for authentication
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

// Import fetch polyfill.
import 'whatwg-fetch';

// Import fetch helper functions.
import { parseJSON } from './fetch-utils';
import validator from '../utils/validator'

// Oauth 2 variables
const API_URL = process.env.REACT_APP_API_URL;
const API_CLIENT_ID = '1fbceff0aee0941934c81ba29cb7454c';

/**
 * Authenticate a user
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
export function authenticate(username, password) {
  return new Promise((resolve, reject) => {
    validator.validate({ username: username, password: password })
      .then((data) => {
        fetch(API_URL + '/oauth/tokens', {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: 'username=' + encodeURIComponent(data.username) +
            '&password=' + encodeURIComponent(data.password) +
            '&client_id=' + encodeURIComponent(API_CLIENT_ID) +
            '&grant_type=' + encodeURIComponent('password')
        }).then(parseJSON)
          .then((response) => {
            if (response.ok) {
              return resolve(response.json);
            }
            return reject(response.json);
          });
      })
      .catch((error) => {      // Validation errors
        reject(error);
      });
  });
}

/**
 * Get profile information about the logged in user
 * @param token
 * @returns {Promise<any>}
 */
export function getMe(token) {
  return new Promise((resolve, reject) => {
    fetch(API_URL + '/oauth/me', {
      method: 'GET',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Authorization": "Bearer " + token
      }
    }).then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }
        return reject(response.json);
      });

  })
}

/**
 * Refresh an access token
 * @param refresh_token
 * @returns {Promise<any>}
 */
export function refreshToken(refresh_token) {
  return new Promise((resolve, reject) => {
    fetch(API_URL + '/oauth/tokens', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        //"Authorization": "Bearer " + token
      },
      body: 'refresh_token=' + encodeURIComponent(refresh_token) +
      '&client_id=' + encodeURIComponent(API_CLIENT_ID) +
      '&grant_type=' + encodeURIComponent('refresh_token')

    }).then(parseJSON)
      .then((response) => {
        if (response.ok) {
          return resolve(response.json);
        }
        return reject(response.json);
      });

  })
}