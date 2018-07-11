/**
 * Description: Profile business logic module
 *
 * Profile service exposes a set of function representing business logic for profile data.
 * The business logic consist of a set of CRUD API functions and other types of services
 * such as validating inputs before performing the remote calls.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// query string parser
import qs from 'qs';

// XHR service
import XHRService, { errorHandler } from "./XHRService";

// Schema services
import ProfileSchema from '../../domain/schemas/ProfileSchema';

// XHR instance
const XHR = XHRService.getInstance();

function logField(prop) {
  console.log('field: ', ProfileSchema.getFieldByName(prop))
}

const model = ['_id', 'firstName', 'lastName', 'email', 'phone', 'createdAt', 'updatedAt'];

model.forEach(prop => {
  logField(prop);
});

/**
 * Validate a profile object against the schema
 * @param profile
 * @returns {*}
 */
function validateProfile(profile) {
  return ProfileSchema.isValid(profile);
}


/**
 * Fin current profile for the authenticated user or create a new
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
 * @param profile
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
const ProfileServiceFactory = () => {
  return {
    validateProfile,
    findOrCreate,
    updateProfile,
    getProfiles,
    getProfileById,
    updateProfileById,
    deleteProfileById
  };
};

export default ProfileServiceFactory();
