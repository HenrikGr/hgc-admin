/*!
 * Description:
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
 * Author:  Henrik Grönvall
 * File:
 * Version: 0.0.1
 * Created on 2016-10-16
 */
// Module dependencies
import { combineReducers } from 'redux';

// Import stateHistory object
//import stateHistory from './statehistory';

// Default state
const defaults = {
  STATE: [],
  userId: '',
};

const userReducer = (state = defaults.userId, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.userId;

    default:
      return state;
  }
};

// Combine reducers
export default combineReducers({
  userId: userReducer,
});