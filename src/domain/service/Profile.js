/**
 * Description: Profile API service
 *
 * Profile service exposes a set of function representing business logic for profile data
 * in terms of a set of CRUD API functions and other types of services such as validating
 * inputs before performing the remote calls.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// query string parser to stringify entity objects when posting
import qs from 'qs';

// XHR service
import XHRService, { errorHandler } from "./XHRService";

// Schema services
import ProfileSchema from '../schemas/ProfileEntity';

// XHR instance
const XHR = XHRService.getInstance();

/**
 * Validate profile entity
 * @param {object} profile - profile entity
 * @returns {object} - either error object or profile entity
 */
function validateProfile(profile) {
  return ProfileSchema.isValid(profile);
}

/**
 * Find or create profile for the authenticated user
 * @returns {Promise<AxiosResponse<any>>}
 */
function findOrCreate() {
  return XHR.get("/api/profiles/me")
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Update profile for the authenticated user.
 * @param {object} profile - profile entity
 * @returns {Promise<AxiosResponse<any>>}
 */
function updateProfile(profile) {
  return XHR.put("/api/profiles/me", qs.stringify(profile))
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Find profiles
 * Support for param queries such as;
 * - conditions (filtering),
 * - pagination, using page as query param,
 * - limit, defining number of items returned,
 * - sorting,
 * - projection,
 * - etc...
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
function getProfiles(params) {
  return XHR.get("/api/profiles", { params: params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Get a profile by id
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function getProfileById(id) {
  return XHR.get("/api/profiles/" + id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Update profile by id
 * @param id
 * @param profile
 * @returns {Promise<AxiosResponse<any>>}
 */
function updateProfileById(id, profile) {
  return XHR.put("/api/profiles/" + id, qs.stringify(profile))
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Delete profile by id
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteProfileById(id) {
  return XHR.delete("/api/profiles/" + id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Export interface for the profile service
 * @constructor
 */
function ProfileServiceFactory() {
  return {
    validateProfile,
    findOrCreate,
    updateProfile,
    getProfiles,
    getProfileById,
    updateProfileById,
    deleteProfileById
  };
}

export default new ProfileServiceFactory();
