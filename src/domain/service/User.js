/**
 * Description: User business logic module
 *
 * User service exposes a set of function representing business logic for user data.
 * The business logic consist of a set of CRUD API functions and other types of services
 * such as validating inputs before performing the remote calls.
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
import UserEntity from '../schemas/UserEntity';

// XHR instance
const XHR = XHRService.getInstance();

/**
 * Validate user entity
 * @param {object} user - user entity
 * @returns {object} - either error object or user entity
 */
function validateUser(user) {
  return UserEntity.isValid(user);
}

/**
 * Create new user
 * @param {object} user - user entity
 * @returns {Promise<AxiosResponse<any>>}
 */
function createUser(user) {
  return XHR.post("/api/users", qs.stringify(user))
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Get users
 * Support for param queries such as;
 * - conditions (filtering),
 * - pagination, using page as query param,
 * - limit, defining number of items returned,
 * - sorting,
 * - projection,
 * - etc...
 * @param {object} params - query object
 * @returns {Promise<AxiosResponse<any>>}
 */
function getUsers(params) {
  return XHR.get("/api/users", { params: params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Get user by id
 * @param {string} id - id key for a user
 * @returns {Promise<AxiosResponse<any>>}
 */
function getUserById(id) {
  return XHR.get("/api/users/" + id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}


/**
 * Update user by id
 * @param {string} id - id key for a user
 * @param {object} user - user entity
 * @returns {Promise<AxiosResponse<any>>}
 */
function updateUserById(id, user) {
  return XHR.put("/api/users/" + id, qs.stringify(user))
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Update users by ids
 * @param {array} ids - array of ids to be updated with the user entity
 * @param {object} user - user entity
 * @returns {Promise<any>}
 */
function updateUsersByIds(ids, user) {
  const body = qs.stringify(user);

  // Create array of promise calls for each user ids
  let promises = [];
  ids.forEach(id => {
    promises.push(XHR.put(`/api/users/${id}`, `${body}`))
  });

  // Return a resolved or rejected promise
  return new Promise((resolve, reject) => {

    // Concurrently run the promises array
    return Promise.all(promises)
      .then(response => {
        return resolve(response.map(r => r.data));
      }).catch(err => {
        return reject(errorHandler(err));
        //return reject(err.map(e => e.error));
      });
  })
}

/**
 * Delete user by id
 * @param {string} id - id key for a user
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteUserById(id) {
  return XHR.delete("/api/users/" + id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}


/**
 * Delete multiple users by ids
 * @param {string} ids - array of ids for a users to be deleted
 * @returns {Promise<any>}
 */
function deleteUsersByIds(ids) {
  // Create array of promise calls for each user ids
  let promises = [];
  ids.forEach(id => {
    promises.push(XHR.delete(`/api/users/${id}`))
  });

  // Return a resolved or rejected promise
  return new Promise((resolve, reject) => {

    // Concurrently run the promises array
    return Promise.all(promises)
      .then(response => {
        return resolve(response.map(r => r.data));
      }).catch(err => {
        return reject(err.map(e => e.error));
      });
  })
}


/**
 * Export interface for the user service
 * @constructor
 */
function UserServiceFactory () {
  return {
    validateUser,
    createUser,
    getUsers,
    getUserById,
    updateUserById,
    updateUsersByIds,
    deleteUserById,
    deleteUsersByIds,
  };
};

// Export interface
export default new UserServiceFactory();
