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
import defaults, {
  appendElement,
  removeById,
  updateElement,
  updateElements
} from './DefaultState'

/**
 * Users state reducer
 * @param state
 * @param action
 * @returns {*}
 */
const usersReducer = (state = defaults.users, action) => {
  switch (action.type) {
    case "FETCH_USERS_STARTED":
      return { ...state, isFetching: action.isFetching, error: {} };
    case "FETCH_USERS_FAILED":
      return { ...state, isFetching: false, error: action.error };
    case "GET_USERS_COMPLETE":
      return { ...state, docs: action.users.docs, isFetching: false, error: {} };

    case "UPDATE_USERS_COMPLETE":
      return { ...state, docs: updateElements(state.docs, action.users), isFetching: false, error: {} };

    case "CREATE_USER_COMPLETE":
      return { ...state, docs: appendElement(state.docs, action.user), isFetching: false, error: {} };

    case "DELETE_USER_COMPLETE":
      return { ...state, docs: removeById(state.docs, action.id), isFetching: false, error: {} };

    case "UPDATE_USER_COMPLETE":
      return { ...state, docs: updateElement(state.docs, action.user), isFetching: false, error: {} };

    default:
      return state;
  }
};

export default usersReducer;