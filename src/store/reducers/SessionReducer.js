/**
 * Description: Session reducer module
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
import {
  CREDENTIALS_VALIDATION_FAILED,
  FETCH_SESSION_START,
  FETCH_SESSION_FAILED,
  FETCH_SESSION_SUCCESS,
  PASSWORD_VISIBLE,
  UPDATE_CREDENTIALS,
  RESET_SESSION_ERROR,
} from '../actions/constants'

/**
 * Session reducer
 * @param {object} state - global state which defaults to the session branch
 * @param {object} action - action creator object in the form { type: ACTION, payload: data }
 * @returns {*}
 */
const sessionReducer = (state = defaults.session, action) => {
  switch (action.type) {
    case CREDENTIALS_VALIDATION_FAILED:
      return {
        ...state,
        error: action.payload
      };

    case FETCH_SESSION_START:
      return {
        ...state,
        error: {},
        isFetching: true
      };

    case FETCH_SESSION_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case FETCH_SESSION_SUCCESS:
      return { ...state,
        token: action.payload,
        entity: defaults.session.entity,
        redirectToReferrer: true,
        isFetching: false,
      };

    case PASSWORD_VISIBLE:
      return {
        ...state,
        showPassword: !state.showPassword
      };

    case UPDATE_CREDENTIALS:
      return {
        ...state,
        entity: { ...state.entity, ...action.payload },
        error: {},
        isFetching: false
      };

    case RESET_SESSION_ERROR:
      return {
        ...state,
        error: {}
      };

    default:
      return state;
  }
};

export default sessionReducer;