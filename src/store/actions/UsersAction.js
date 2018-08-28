/**
 * Description: Module containing action creators for the users state.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// User XHR Service
import userService from "../../domain/service/User";
import {
  LOG_STATUS,
  USER_VALIDATION_FAILED,
  USERS_FETCHING,
  USERS_ERROR,
  USERS_GET_SUCCESS,
  USERS_UPDATE_SUCCESS,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_RESET_ERROR,
} from "./constants";

/**
 * Action creator - fetching users information
 * @param {object} params - query params
 * @returns {Function}
 */
function getUsers(params) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Start get users" });
    dispatch({ type: USERS_FETCHING });
    userService.findByQuery(params)
      .then(json => {
        dispatch({ type: USERS_GET_SUCCESS, payload: json.docs });
      })
      .catch(err => {
        dispatch({ type: USERS_ERROR, payload: err });
      });
  };
}

/**
 * Action creator - create user
 * @param {object} user - user entity object
 * @returns {Function}
 */
function createUser(user) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Start create user" });
    const errors = userService.validate(user);
    if (errors.message) {
      dispatch({ type: USER_VALIDATION_FAILED, payload: errors });
    } else {
      dispatch({ type: USERS_FETCHING });
      userService.create(user)
        .then(json => {
          dispatch({ type: USER_CREATE_SUCCESS, payload: json });
        })
        .catch(errors => {
          dispatch({ type: USERS_ERROR, payload: errors });
        })
    }
  }
}

/**
 * Action creator - updating user by id
 * @param {string} id - user entity id string
 * @param {object} user - user entity object
 * @returns {Function}
 */
function updateUserById(id, user) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Update user by id: " + id });
    const errors = userService.validate(user);
    if (errors.message) {
      dispatch({ type: USER_VALIDATION_FAILED, payload: errors });
    } else {
      dispatch({ type: USERS_FETCHING });
      userService.updateById(id, user)
        .then(json => {
          dispatch({ type: USER_UPDATE_SUCCESS, payload: json });
        })
        .catch(errors => {
          dispatch({ type: USERS_ERROR, payload: errors });
        })
    }
  }
}

/**
 * Action creator - delete user by id
 * @param {string} id - user entity id string
 * @returns {Function}
 */
function deleteUserById(id) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Delete user by id: " + id });
    dispatch({ type: USERS_FETCHING });
    userService.deleteById(id)
      .then(() => {
        dispatch({ type: USER_DELETE_SUCCESS });
      })
      .catch(errors => {
        dispatch({ type: USERS_ERROR, payload: errors });
      })
  }
}

/**
 * Action creator - update users
 * @param {array} ids - array of entity ids to be updated
 * @param {object} user- entity user object to be stored on multiple user(s)
 * @returns {Function}
 */
function updateUsersByIds(ids, user) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Update users by ids: " + ids.toString() });
    dispatch({ type: USERS_FETCHING });
    userService.updateByIds(ids, user)
      .then(json => {
        dispatch({ type: USERS_UPDATE_SUCCESS, payload: json });
      })
      .catch(errors => {
        dispatch({ type: USERS_ERROR, payload: errors });
      })
  }
}

/**
 * Action creator - Used to reset error
 * @returns {{type: string}}
 */
function resetError() {
  return { type: USER_RESET_ERROR }
}

/**
 * Factory for user actions creator interface
 * @constructor
 */
function UsersActionFactory() {
  return {
    getUsers,
    createUser,
    updateUserById,
    deleteUserById,
    updateUsersByIds,
    resetError,
  }
}

// Export the interface
export default new UsersActionFactory();

