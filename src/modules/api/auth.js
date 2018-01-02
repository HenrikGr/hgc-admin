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

/**
 *
 * @param url
 * @param authToken
 * @returns {Promise<any>}
 */
export const getUser = (url, authToken) => {
  return new Promise( function( resolve, reject ) {
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + authToken
      }
    };

    fetch(API_URL + url, options)
      .then(status)
      .then(json)
      .then((json) => {
        resolve(json);
      }).catch((error) => {
        reject(error);
      });
  })

};

/**
 * SignUpp API
 * @param url
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
export const signUp = (url, username, password) => {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
    };

    fetch(API_URL + url, options)
      .then(status)
      .then(json)
      .then((json) => {
        resolve(json);
      }).catch((error) => {
      reject(error);
    });
  })

};

/**
 *
 * @param url
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
export const logIn = (url, username, password) => {
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
        if (json.authToken) return getUser('/api', json.authToken);
        return Promise.reject( new AppError('Authorization token missing') );
      }).then((user) => {
        resolve(user)
      }).catch( function( error ) {
      reject( error );
    });

  });
};



