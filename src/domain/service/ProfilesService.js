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

// validator
import validator from "../../utils/validator";

// XHR service
import XHRService, {errorHandler} from "./XHRService";
const XHR = XHRService.getInstance();

/**
 * Validation function for profile data
 * @param profile
 * @returns {*}
 */
const validateProfile = (profile) => {
  const {email, firstName, lastName, phone} = profile;
  return validator.validate({ email, firstName, lastName, phone });
};

/**
 * Function to check if source profile is equal with target profile
 * TODO: Create a more generic function that can be used for all kind of objects.
 * @param source
 * @param target
 * @returns {boolean}
 */
const isEqual = (source, target) => {
  return (
    source.email === target.email &&
    source.firstName === target.firstName &&
    source.lastName === target.lastName &&
    source.phone === target.phone
  )
};

/**
 * Function that returns if source profile is different than target profile
 * @param source
 * @param target
 * @returns {boolean}
 */
const hasChanged = (source, target) => {
  return !isEqual(source, target);
};

/**
 * API function to retrieve current profile for the authenticated user
 * *) This API end point creates a profile if the profile does not exist.
 * @method GET
 * @endpoint /api/profiles/me
 * @headers Authorization: Bearer token
 * @scope account
 * @returns {Promise<T>}
 */
const getProfile = () => {
  return XHR.get("/api/profiles/me")
    .then(response => {
      // Returns existing or created profile for authenticated user
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * API function to update profile for the authenticated user.
 * @method PUT
 * @endpoint /api/profiles/me
 * @headers Authorization: Bearer token
 * @scope account
 * @param profile
 * @returns {Promise<T>}
 */
const updateProfile = (profile) => {
  const {email, firstName, lastName, phone} = profile;
  let body = "email=" +
    encodeURIComponent(email) +
    "&firstName=" +
    encodeURIComponent(firstName) +
    "&lastName=" +
    encodeURIComponent(lastName) +
    "&phone=" +
    encodeURIComponent(phone);

  return XHR.put("/api/profiles/me", body)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * API function to retrieve profiles from the backend
 * This endpoint supports param queries such as
 * - query conditions, aka filtering,
 * - pagination, using page as query param
 * - limit, defining number of items per page,
 * - sorting and
 * - projection,
 * @method GET
 * @endpoint /api/profiles
 * @headers Authorization: Bearer token
 * @scope admin
 * @param params
 * @returns {Promise<T>}
 */
const getProfiles = (params) => {
  return XHR.get("/api/profiles", { params: params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * API function to get a profile by its id.
 * @method GET
 * @endpoint /api/profiles/:id
 * @headers Authorization: Bearer token
 * @scope admin
 * @param id
 * @returns {Promise<T>}
 */
const getProfileById = (id) => {
  return XHR.get("/api/profiles/" + id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * API function to update a profile by id
 * @method PUT
 * @endpoint /api/profiles/:id
 * @headers Authorization: Bearer token
 * @scope admin
 * @param id
 * @param profile
 * @returns {Promise<T>}
 */
const updateProfileById = (id, profile) => {
  const {email, firstName, lastName, phone} = profile;
  let body = "email=" +
    encodeURIComponent(email) +
    "&firstName=" +
    encodeURIComponent(firstName) +
    "&lastName=" +
    encodeURIComponent(lastName) +
    "&phone=" +
    encodeURIComponent(phone);

  return XHR.put("/api/profiles/" + id, body)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * API function to delete a profile by id
 * @method DELETE
 * @endpoint /api/profiles/:id
 * @headers Authorization: Bearer token
 * @scope admin
 * @param id
 * @returns {Promise<T>}
 */
const deleteProfileById = (id) => {
  return XHR.delete("/api/profiles/" + id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * Export interface for the profile service
 * @returns {{
 * validateProfile: function(*): *,
 * isEqual: function(*, *): Boolean,
 * hasChanged: function(*, *): Boolean,
 * getProfile: function(): Promise<T>,
 * updateProfile: function(*): Promise<T>,
 * getProfileById: function(*): Promise<T>,
 * updateProfileById: function(*, *): Promise<T>,
 * deleteProfileById: function(*): Promise<T>
 * }}
 * @constructor
 */
const ProfileServiceFactory = () => {
  return {
    validateProfile,
    isEqual,
    hasChanged,
    getProfile,
    updateProfile,
    getProfiles,
    getProfileById,
    updateProfileById,
    deleteProfileById
  };
};

export default ProfileServiceFactory();
