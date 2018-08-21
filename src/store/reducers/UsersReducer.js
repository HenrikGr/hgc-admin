/**
 * Description: Module containing reducer for users state
 *
 * The users reducer function creates a new state based on the current state
 * and the description of the new state supplied by the users action creators.
 *
 * GENERAL
 * Reducers are pure JavaScript functions that:
 * - Create a new state, given the current state and an action
 * - Centralize data mutations
 * - Can act on all or part of the state
 * - Can be combined and reused
 *
 * Because they're pure functions, reducers have no side effects,
 * so they're easy to read, test, and debug. And you can compose reducers,
 * which makes it easy to implement simple reducers that are concerned
 * with only a portion of the overall application state.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Initial state
import defaults from './DefaultState'
import {
  USER_VALIDATION_FAILED,
  USERS_FETCHING,
  USERS_ERROR,
  USERS_GET_SUCCESS,
  //USERS_UPDATE_SUCCESS, // TODO: Test multi select and multi update
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_RESET_ERROR,
} from "../actions/constants";

// Array helper functions
import { appendElement, removeById, updateElement } from '../../utils/helper'

/**
 * Users state reducer
 * @param state
 * @param action
 * @returns {*}
 */
const usersReducer = (state = defaults.users, action) => {
  switch (action.type) {
    case USER_VALIDATION_FAILED:
      return {
        ...state,
        error: action.payload
      };

    case USERS_FETCHING:
      return {
        ...state,
        isFetching: true,
        error: {}
      };

    case USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case USERS_GET_SUCCESS:
      return {
        ...state,
        entities: action.payload,
        isFetching: false
      };

    case USER_CREATE_SUCCESS:
      return {
        ...state,
        entities: appendElement(state.entities, action.payload),
        isFetching: false,
        error: {}
      };

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        entities: removeById(state.entities, action.payload),
        isFetching: false,
        error: {}
      };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        entities: updateElement(state.entities, action.payload),
        isFetching: false,
        error: {}
      };

    case USER_RESET_ERROR:
      return {
        ...state,
        error: {},
        isFetching: false
      };

    default:
      return state;
  }
};

export default usersReducer;