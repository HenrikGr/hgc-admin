/**
 * @prettier
 * @description: User API services
 *
 * All api calls return a promise, either resolved or rejected which means
 * it can be used in async / await or other promise based functions.
 *
 * The error handler is a default axios error handler with no modifications.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import qs from 'qs';
import XHRService, { errorHandler } from "./XHRService";

/**
 * XHR instance
 * @private
 */
const XHR = XHRService.getInstance()

/**
 * Create user
 * @param {object} user - user entity
 * @returns {Promise<AxiosResponse<any>>}
 * @public
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
 * @public
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
 * @public
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
 * @public
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
 * @public
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
 * @param {array} ids - array of ids for a users to be deleted
 * @returns {Promise<any>}
 * @public
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
 * Interface constructor for the user api service
 * @constructor
 */
function UserAPIFactory () {
  return {
    create,
    findByQuery,
    updateById,
    updateByIds,
    deleteById,
    deleteByIds,
  };
}

export default new UserAPIFactory();
