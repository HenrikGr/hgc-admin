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
import statusReducer from './StatusReducer';
import sessionReducer from './SessionReducer';
import profileReducer from './ProfileReducer';
import usersReducer from './UsersReducer'

/**
 * Combine different state branch reducers to one app reducer
 * @type {Reducer<any>}
 */
const appReducer = combineReducers({
  status: statusReducer,
  profile: profileReducer,
  users: usersReducer,
  session: sessionReducer,
});

/**
 * A root reducer
 * @see https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
 * @param state
 * @param action
 * @returns {*}
 */
const rootReducer = (state, action) => {
  if (action.type === 'REMOVE_SESSION') {
    state = undefined
  }
  return appReducer(state, action)
};

export default rootReducer;