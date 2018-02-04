/**
 * Description
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

// Import fetch polyfill.
import 'whatwg-fetch';

// Import fetch utils.
import { status, json } from './fetch-utils';
import validator from '../utils/validator'
const API_URL = process.env.REACT_APP_API_URL;
const API_USER_RESOURCE_URL = API_URL + '/api/user';

/**
 * Create a user record
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
export function createUser(username, password)  {
  return new Promise((resolve, reject) => {

    // Client side validation
    validator.validate({ username: username, password: password }).then((data) => {

      fetch(API_USER_RESOURCE_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'username=' + encodeURIComponent(data.username) + '&password=' + encodeURIComponent(data.password),
        mode: 'no-cors' // 'cors' by default
      }).then(status)         // Check status code 400+ or 500+
        .then(json)
        .then((json) => {
          // Check for application errors, ie status 200 and errors
          if (json.errors) {
            return Promise.reject(json);
          } else {
            resolve(json);
          }
        }).catch((errors) => {
        reject(errors);
      });

    }).catch((errors) => {
      reject(errors);             // Validation errors
    });

  });
}
