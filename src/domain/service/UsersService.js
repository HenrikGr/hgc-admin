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

import validator from "../../utils/validator";
import XHRService, {errorHandler} from "./XHRService";
const XHR = XHRService.getInstance();

/**
 * Validator function for user data
 * @param user
 * @returns {*}
 */
const validateUser = (user) => {
  const {username, password, admin, active, scope} = user;
  return validator.validate({ username, password, admin, active, scope })
};

/**
 * API function to create a new user
 * @method POST
 * @endpoint /api/users
 * @headers Authorization: Bearer token
 * @scope account
 * @param user
 * @returns {Promise<T>}
 */
const createUser = (user) => {
  const { username, password, scope, admin, active } = user;
  const body =
    "username=" +
    encodeURIComponent(username) +
    "&password=" +
    encodeURIComponent(password) +
    "&scope=" +
    encodeURIComponent(scope) +
    "&admin=" +
    encodeURIComponent(admin) +
    "&active=" +
    encodeURIComponent(active);

  return XHR.post("/api/users", body)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * API function to get a user by id
 * @method GET
 * @endpoint /api/users/:id
 * @headers Authorization: Bearer token
 * @scope account
 * @param id
 * @returns {Promise<T>}
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
 * API function to update a user by id
 * @method PUT
 * @endpoint /api/users/:id
 * @headers Authorization: Bearer token
 * @scope account
 * @param id
 * @param user
 * @returns {Promise<any>}
 */
function updateUserById(id, user) {
  const { username, admin, active, scope } = user;
  const body =
    "username=" +
    encodeURIComponent(username) +
    "&admin=" +
    encodeURIComponent(admin) +
    "&active=" +
    encodeURIComponent(active) +
    "&scope=" +
    encodeURIComponent(scope);

  return XHR.put("/api/users/" + id, body)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * API function to delete a user by id
 * @method DELETE
 * @endpoint /api/users/:id
 * @headers Authorization: Bearer token
 * @scope account
 * @param id
 * @returns {Promise<T>}
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
 * API function to retrieve users from the backend
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
const getUsers = (params) => {
  return XHR.get("/api/users", { params: params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
};

/**
 * Update multiple users with same body data
 * @param ids
 * @param user
 * @returns {Promise<any>}
 */
const updateUsersByIds = (ids, user) => {
  const {admin, active, scope} = user;
  const body =
    "admin=" +
    encodeURIComponent(admin) +
    "&active=" +
    encodeURIComponent(active) +
    "&scope=" +
    encodeURIComponent(scope);

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
        return reject(err.map(e => e.error));
      });
  })
};

/**
 * Delete multiple users by ids
 * @param ids
 * @returns {Promise<any>}
 */
const deleteUsersByIds = ids => {

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
};


/**
 * Export interface for the user service
 * @returns {{
 * validateUser: function(*): *,
 * createUser: function(*): Promise<T>,
 * getUserById: function(*): Promise<T>,
 * updateUserById: function(*, *): Promise<any>,
 * deleteUserById: function(*): Promise<T>
 * }}
 * @constructor
 */
export const UserServiceFactory = () => {
  return {
    validateUser,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getUsers,
    updateUsersByIds,
    deleteUsersByIds,
  };
};

// Export interface
export default UserServiceFactory();
