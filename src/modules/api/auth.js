/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

// Import fetch helper functions.
import validator from "../utils/validator";
import XHR, { errorHandler } from "./config";

// Oauth 2 variables
const API_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

/**
 * Get an access token
 * @param username
 * @param password
 * @returns {Promise<any>}
 */
export function getAccessToken(username, password) {
  return validator
    .validate({ username: username, password: password })
    .then(data => {
      let body =
        "username=" +
        encodeURIComponent(data.username) +
        "&password=" +
        encodeURIComponent(data.password) +
        "&client_id=" +
        encodeURIComponent(API_CLIENT_ID) +
        "&grant_type=" +
        encodeURIComponent("password");

      return XHR.post("/oauth/tokens", body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          return Promise.resolve(response.data);
        })
        .catch(error => {
          return Promise.reject(errorHandler(error));
        });
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

/**
 * Refresh an access token
 * @param refresh_token
 * @returns {Promise<any>}
 */
export function refreshAccessToken(refresh_token) {
  let body =
    "refresh_token=" +
    encodeURIComponent(refresh_token) +
    "&client_id=" +
    encodeURIComponent(API_CLIENT_ID) +
    "&grant_type=" +
    encodeURIComponent("refresh_token");

  return XHR.post("/oauth/tokens", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}
