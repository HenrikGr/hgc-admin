/**
 * @prettier
 * @description: User action creators
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found
 */
import UserAPI from '../../domain/xhr/UserAPI'
import {
  //VALIDATION_ERROR,
  //FETCH_VALIDATION_ERROR,
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET_ERROR,
  USERS_GET_SUCCESS,
  //USERS_UPDATE_SUCCESS,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS
} from '../constants'

/**
 * User API instance
 * @type {UserAPI}
 */
const userAPI = new UserAPI()

/**
 * Action creator - fetching users information
 * @param {object} params - query params
 * @returns {Function}
 * @public
 */
export function getUsers(params) {
  return async function(dispatch) {
    dispatch({ type: FETCH_START })
    userAPI.findUsers(params)
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: USERS_GET_SUCCESS, payload: json })
      })
      .catch(err => {
        dispatch({ type: FETCH_ERROR, payload: err })
      })
  }
}

/**
 * Action creator - create user
 * @param {object} user - user services object
 * @returns {Function}
 * @public
 */
export async function createUser(user) {
  return function(dispatch) {
    dispatch({ type: FETCH_START })
    userAPI.createUser(user)
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: USER_CREATE_SUCCESS, payload: json })
      })
      .catch(errors => {
        dispatch({ type: FETCH_ERROR, payload: errors })
      })
  }
}

/**
 * Action creator - updating user by id
 * @param {string} id - user services id string
 * @param {object} user - user services object
 * @returns {Function}
 * @public
 */
export function updateUserById(id, user) {
  return async function(dispatch) {
    dispatch({ type: FETCH_START })
    userAPI.updateUserById(id, user)
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: USER_UPDATE_SUCCESS, payload: json })
      })
      .catch(errors => {
        dispatch({ type: FETCH_ERROR, payload: errors })
      })
  }
}

/**
 * Action creator - delete user by id
 * @param {string} id - user services id string
 * @returns {Function}
 * @public
 */
export function deleteUserById(id) {
  return async function(dispatch) {
    dispatch({ type: FETCH_START })
    userAPI.deleteUserById(id)
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
 * Action creator - Used to reset error
 * @returns {{type: string}}
 * @public
 */
export function resetError() {
  return { type: RESET_ERROR }
}

