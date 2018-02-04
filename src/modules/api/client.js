/**
 * Description:
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
import { parseJSON } from './fetch-utils';
import validator from '../utils/validator'
const API_URL = process.env.REACT_APP_API_URL;
const API_CLIENT_RESOURCE_URL = API_URL + '/api/client';

/**
 * Create a client
 * @param name
 * @param user
 * @returns {Promise<any>}
 */
export function createClient(name, user)  {
  return new Promise((resolve, reject) => {
    validator.validate({ name: name, user: user }).then((data) => {
      fetch(API_CLIENT_RESOURCE_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({user: data.user, name: data.name})
      }).then(parseJSON)
        .then((response) => {
          if (response.ok) {
            return resolve(response.json);
          }
          return reject(response.json);
        });
    }).catch((error) => {
      reject(error);             // Validation errors
    });
  });
}

/**
 * Get client by name
 * @param name
 * @returns {Promise<any>}
 */
export function getClientByName(name)  {
  return new Promise((resolve, reject) => {
    validator.validate({ name: name }).then((data) => {
      fetch(API_CLIENT_RESOURCE_URL + '?name=' + data.name, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      }).then(parseJSON)
        .then((response) => {
          if (response.ok) {
            return resolve(response.json);
          }
          return reject(response.json);
        });
    }).catch((error) => {
      reject(error);             // Validation errors
    });
  });
}
