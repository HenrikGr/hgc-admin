/**
 * @prettier
 * @description: users action creator services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import userSchemaServices from '../../domain/schemas/User'
import userService from '../../domain/service/User'
import {
  VALIDATION_ERROR,
  //FETCH_VALIDATION_ERROR,
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET_ERROR,
  USERS_GET_SUCCESS,
  USERS_UPDATE_SUCCESS,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS
} from './constants'

/**
 * Action creator - fetching users information
 * @param {object} params - query params
 * @returns {Function}
 * @public
 */
function getUsers(params) {
  return function(dispatch) {
    dispatch({ type: FETCH_START })
    userService
      .findByQuery(params)
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: USERS_GET_SUCCESS, payload: json.docs })
      })
      .catch(err => {
        dispatch({ type: FETCH_ERROR, payload: err })
      })
  }
}

/**
 * Action creator - create user
 * @param {object} user - user entity object
 * @returns {Function}
 * @public
 */
function createUser(user) {
  return function(dispatch) {
    const errors = userSchemaServices.validate(user)
    if (errors.message) {
      dispatch({ type: VALIDATION_ERROR, payload: errors })
    } else {
      dispatch({ type: FETCH_START })
      userService
        .create(user)
        .then(json => {
          dispatch({ type: FETCH_SUCCESS })
          dispatch({ type: USER_CREATE_SUCCESS, payload: json })
        })
        .catch(errors => {
          dispatch({ type: FETCH_ERROR, payload: errors })
        })
    }
  }
}

/**
 * Action creator - updating user by id
 * @param {string} id - user entity id string
 * @param {object} user - user entity object
 * @returns {Function}
 * @public
 */
function updateUserById(id, user) {
  return function(dispatch) {
    const errors = userSchemaServices.validate(user)
    if (errors.message) {
      dispatch({ type: VALIDATION_ERROR, payload: errors })
    } else {
      dispatch({ type: FETCH_START })
      userService
        .updateById(id, user)
        .then(json => {
          dispatch({ type: FETCH_SUCCESS })
          dispatch({ type: USER_UPDATE_SUCCESS, payload: json })
        })
        .catch(errors => {
          dispatch({ type: FETCH_ERROR, payload: errors })
        })
    }
  }
}

/**
 * Action creator - delete user by id
 * @param {string} id - user entity id string
 * @returns {Function}
 * @public
 */
function deleteUserById(id) {
  return function(dispatch) {
    dispatch({ type: FETCH_START })
    userService
      .deleteById(id)
      .then(() => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: USER_DELETE_SUCCESS })
      })
      .catch(errors => {
        dispatch({ type: FETCH_ERROR, payload: errors })
      })
  }
}

/**
 * Action creator - update users
 * @param {array} ids - array of entity ids to be updated
 * @param {object} user- entity user object to be stored on multiple user(s)
 * @returns {Function}
 * @public
 */
function updateUsersByIds(ids, user) {
  return function(dispatch) {
    dispatch({ type: FETCH_START })
    userService
      .updateByIds(ids, user)
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: USERS_UPDATE_SUCCESS, payload: json })
      })
      .catch(errors => {
        dispatch({ type: FETCH_ERROR, payload: errors })
      })
  }
}

/**
 * Action creator - Used to reset error
 * @returns {{type: string}}
 * @public
 */
function resetError() {
  return { type: RESET_ERROR }
}

/**
 * Interface constructor for users actions creators
 * @constructor
 * @private
 */
function UsersActionFactory() {
  return {
    getUsers,
    createUser,
    updateUserById,
    deleteUserById,
    updateUsersByIds,
    resetError
  }
}

export default new UsersActionFactory()
