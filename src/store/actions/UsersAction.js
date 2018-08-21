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
    userService.getUsers(params)
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
 * @param user
 * @returns {Function}
 */
function createUser(user) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Start create user" });
    const error = userService.validateUser(user);
    if (error.message) {
      dispatch({ type: USER_VALIDATION_FAILED, payload: error });
    } else {
      dispatch({ type: USERS_FETCHING });
      userService.createUser(user)
        .then(json => {
          dispatch({ type: USER_CREATE_SUCCESS, payload: json });
        })
        .catch(err => {
          dispatch({ type: USERS_ERROR, payload: err });
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
    const error = userService.validateUser(user);
    if (error.message) {
      dispatch({ type: USER_VALIDATION_FAILED, payload: error });
    } else {
      dispatch({ type: USERS_FETCHING });
      userService.updateUserById(id, user)
        .then(json => {
          dispatch({ type: USER_UPDATE_SUCCESS, payload: json });
        })
        .catch(err => {
          dispatch({ type: USERS_ERROR, payload: err });
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
    userService.deleteUserById(id)
      .then(() => {
        dispatch({ type: USER_DELETE_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: USERS_ERROR, payload: err });
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
    userService.updateUsersByIds(ids, user)
      .then(json => {
        dispatch({ type: USERS_UPDATE_SUCCESS, payload: json });
      })
      .catch(err => {
        dispatch({ type: USERS_ERROR, payload: err });
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
 * Factory for users interface
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

