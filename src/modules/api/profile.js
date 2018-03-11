/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Import fetch helper functions.
import validator from "../utils/validator";
import XHR, { errorHandler } from "./config";

/**
 * Get profile
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getProfile(access_token) {
  return XHR.get("/oauth/me", {
    headers: {
      Authorization: "Bearer " + access_token
    }
  })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Update profile information
 * @param email
 * @param firstName
 * @param lastName
 * @param phone
 * @param access_token
 * @returns {Promise<any>}
 */
export function updateProfile(email, firstName, lastName, phone, access_token) {
  return validator
    .validate({
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    })
    .then(data => {
      let body =
        "email=" +
        encodeURIComponent(data.email) +
        "&firstName=" +
        encodeURIComponent(data.firstName) +
        "&lastName=" +
        encodeURIComponent(data.lastName) +
        "&phone=" +
        encodeURIComponent(data.phone);

      return XHR.post("/oauth/me", body, {
        headers: {
          Authorization: "Bearer " + access_token
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
