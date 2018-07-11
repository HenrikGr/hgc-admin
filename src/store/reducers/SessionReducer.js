/**
 * Description: Module containing reducer for session state
 *
 * The session reducer function creates a new state based on the current state
 * and the description of the new state supplied by the session action creators.
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

// Default state shape
import defaults from './DefaultState'

/**
 * Session reducer
 * @param state
 * @param action
 * @returns {*}
 */
const sessionReducer = (state = defaults.session, action) => {
  switch (action.type) {
    case "CREDENTIALS_FAILED":
    case "GET_SESSION_FAILED":
      return Object.assign({}, { error: action.error });

    case "GET_SESSION_START":
      return Object.assign({}, { isFetching: action.isFetching });

    case "GET_SESSION_COMPLETE":
      return Object.assign({}, action.json);

    case "RESET_SESSION":
      return Object.assign({}, {});

    default:
      return state;
  }
};

export default sessionReducer;