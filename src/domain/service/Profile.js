/**
 * Description: Profile API service
 *
 * The service expose a set of interface to deal with profile services such as:
 * - getting a profile entity based on json schema,
 * - validating profile based on json schema,
 * - remote XHR calls to get, update profile entity,
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

// Credentials schema
import profileSchema from '../schemas/json/profile'

// Base entity model
import Entity from './entity/Entity'

// XHR instance
const XHR = XHRService.getInstance();

// Entity model instance
const ProfileEntity = new Entity(profileSchema);

/**
 * Get profile schema
 * @returns {object} - profile json schema
 */
function getSchema() {
  return profileSchema
}

/**
 * Get profile default entity
 * @returns {object} - profile default entity
 */
function getEntity() {
  return ProfileEntity.getEntity();
}

/**
 * Validate profile entity
 * @param {object} profile - profile entity
 * @returns {object} - profile entity of no error otherwise entity validation exception
 */
function validate(profile) {
  return ProfileEntity.isValid(profile);
}

/**
 * Find or create profile for the authenticated user
 * @returns {Promise<AxiosResponse<any>>}
 */
function getMe() {
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
function updateMe(profile) {
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
 * @param {object} params - query params
 * @returns {Promise<AxiosResponse<any>>}
 */
function findByQuery(params) {
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
 * @param {string} id - id key for the profile
 * @returns {Promise<AxiosResponse<any>>}
 */
function getById(id) {
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
 * @param {string} id - id key for the profile
 * @param profile
 * @returns {Promise<AxiosResponse<any>>}
 */
function updateById(id, profile) {
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
 * @param {string} id - id key for the profile
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteById(id) {
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
    getSchema,
    getEntity,
    validate,
    getMe,
    updateMe,
    findByQuery,
    getById,
    updateById,
    deleteById
  };
}

export default new ProfileServiceFactory();
