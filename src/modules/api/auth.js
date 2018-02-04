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
const API_URL = process.env.REACT_APP_API_URL;
const API_AUTHENTICATE_URL = API_URL + '/api/login';

/**
 * Authenticate a user
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
export function authenticate(username, password) {
  return new Promise((resolve, reject) => {
    validator.validate({ username: username, password: password }).then((data) => {
        fetch(API_AUTHENTICATE_URL, {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            //"Authorization": 'Basic MWZiY2VmZjBhZWUwOTQxOTM0YzgxYmEyOWNiNzQ1NGM6YjAyNDZlNjhiZGMzZWI3MzhkNGU4NTcyYzFjOWZmODQ1OThlNjdiZDUzMzc1OWNjZmU0MGQwZmIxOGNhMTQ1Nw=='
          },
          body: 'username=' + encodeURIComponent(data.username) +
            '&password=' + encodeURIComponent(data.password) +
            '&grant_type=client_credentials'
        }).then(parseJSON)
          .then((response) => {
            if (response.ok) {
              return resolve(response.json);
            }
            return reject(response.json);
          });
    }).catch((error) => {      // Validation errors
      reject(error);
    });
  });
}
