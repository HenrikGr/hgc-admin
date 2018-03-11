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
import { combineReducers } from "redux";

// Default state
const defaults = {
  status: "Application started.",
  session: {},
  profile: {}
};

const statusReducer = (state = defaults.status, action) => {
  switch (action.type) {
    case "FETCH_BEGIN":
      return action.status;
    default:
      return state;
  }
};

const sessionReducer = (state = defaults.session, action) => {
  switch (action.type) {
    case "FETCH_SESSION_STARTED":
      return Object.assign({}, { isFetching: true });
    case "FETCH_SESSION_COMPLETE":
      return Object.assign({}, state, { isFetching: false }, action.json);
    case "FETCH_SESSION_FAILED":
      return Object.assign({}, { isFetching: false }, { error: action.error });
    case "REMOVE_SESSION":
      return {};
    default:
      return state;
  }
};

const profileReducer = (state = defaults.profile, action) => {
  switch (action.type) {
    case "FETCH_PROFILE_STARTED":
      return Object.assign({}, { isFetching: true });
    case "FETCH_PROFILE_COMPLETE":
      return Object.assign({}, state, { isFetching: false }, action.json);
    case "FETCH_PROFILE_FAILED":
      return Object.assign({}, { isFetching: false }, { error: action.error });
    default:
      return state;
  }
};

// Combine reducers
export default combineReducers({
  status: statusReducer,
  session: sessionReducer,
  profile: profileReducer
});
