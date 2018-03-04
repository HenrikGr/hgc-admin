/**
 * Description: Reducers
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

// Module dependencies
import { combineReducers } from 'redux';

// Default state
const defaults = {
  status: 'Start the application',
  session: {},
  user: {},
};

/**
 * Status reducer to log all fetch actions
 * @param state
 * @param action
 * @returns {string}
 */
const statusReducer = (state = defaults.status, action) => {
  switch (action.type) {
    case 'FETCH_STARTED':
      return 'Fetching...';
    case 'FETCH_COMPLETE':
      return 'Fetch complete';
    case 'FETCH_FAILED':
      return 'Fetch failed ' + (action.error ? action.error : '');
    default:
      return state;
  }
};

/**
 * Session reducer to manage session information (token)
 * @param state
 * @param action
 * @returns {*}
 */
const sessionReducer = (state = defaults.session, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return action.token;
    case 'REMOVE_SESSION':
      return {};
    default:
      return state;
  }
};


// Combine reducers
export default combineReducers({
  status: statusReducer,
  session: sessionReducer,
});