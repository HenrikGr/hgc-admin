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

// Credentials schema
import userSchema from '../schemas/json/user'

// Base entity model
import Entity from './entity/Entity'

// Entity model instance
const UserEntity = new Entity(userSchema);

// XHR instance
const XHR = XHRService.getInstance();

/**
 * Get user schema
 * @returns {object} - user json schema
 */
function getSchema() {
  return userSchema;
}

/**
 * Get user default entity
 * @returns {object} - user default entity
 */
function getEntity() {
  return UserEntity.getEntity();
}

/**
 * Validate a user object
 * @param {object} user - profile entity
 * @returns {object} - user entity of no error otherwise entity validation exception
 */
function validate(user) {
  return UserEntity.isValid(user);
}

/**
 * Create user
 * @param {object} user - user entity
 * @returns {Promise<AxiosResponse<any>>}
 */
function create(user) {
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
function findByQuery(params) {
  return XHR.get("/api/users", { params: params })
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
function updateById(id, user) {
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
function updateByIds(ids, user) {
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
function deleteById(id) {
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
function deleteByIds(ids) {
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
    getSchema,
    getEntity,
    validate,
    create,
    findByQuery,
    updateById,
    updateByIds,
    deleteById,
    deleteByIds,
  };
}

// Export interface
export default new UserServiceFactory();
