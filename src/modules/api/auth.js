/*!
 * Description: Authentication API.
 *
 * The API consist of;
 * - getCurrentUser = GET /api  (*)
 * - logIn          = POST /auth/login
 * - logOut         = Clear the local store
 * - SignUp         = POST /auth/sign up
 *
 * All POST ops must use a form with the Content_Type set to "application/x-www-form-urlencoded; charset=UTF-8"
 * All GET ops must set the Content_Type to "application/json".
 *
 * (*) For all routes that require authorization, the header must also include
 * "Authorization": Bearer<authorization token>.
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created on 2016-07-13
 */

// Import fetch polyfill.
import 'whatwg-fetch';

// Import fetch utils.
import { status, json } from './fetch-utils';
import { API_URL } from './config'
import AppError from './error'
import validator from '../utils/validator'

/**
 * Get user id information based on an access token
 * @param authToken: string
 * @returns {Promise<any>}
 */
export function getUserId(authToken)  {
  return new Promise((resolve, reject) => {
    fetch(API_URL + '/api', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + authToken
      }
    }).then(status)
      .then(json)
      .then((json) => {
        resolve(json);
      }).catch((error) => {
        reject(error);
      });
  });
}

/**
 * Create a user record
 * @param url
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
export function registerUser(url, username, password)  {
  return new Promise((resolve, reject) => {

    // Client side validation
    validator.validate({ username: username, password: password }).then((data) => {

      fetch(API_URL + url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: 'username=' + encodeURIComponent(data.username) + '&password=' + encodeURIComponent(data.password)
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

/**
 * Authenticate (log in) a user.
 * This is really a wrapper function to first get the auth token and
 * after that get the user id string from the database.
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
export function logIn(url, username, password) {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
    };

    fetch( API_URL + url, options )
      .then(status)               // Check status code
      .then(json)                 // Get the response as json
      .then((json) => {
        if (json.errors) return Promise.reject(json);
        if (json.authToken) return getUserId(json.authToken);
        return Promise.reject( new AppError('Authorization token missing') );
      }).then((user) => {
        resolve(user)
      }).catch( function( error ) {
      reject( error );
    });

  });
}
