/**
 * Description: Module containing reducer for profile state
 *
 * The profile reducer function creates a new state based on the current state
 * and the description of the new state supplied by the profile action creators.
 *
 * GENERAL
 * Reducers are pure JavaScript functions that:
 * - Create a new state, given the current state and an action
 * - Centralize data mutations
 * - Can act on all or part of the state
 * - Can be combined and reused
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// initial state
import defaults from './DefaultState'

/**
 * Profile state reducer
 * @param state
 * @param action
 * @returns {*}
 */
const profileReducer = (state = defaults.profile, action) => {
  switch (action.type) {
    case "PROFILE_VALIDATION_FAILED":
    case "GET_PROFILE_FAILED":
    case "UPDATE_PROFILE_FAILED":
      return Object.assign({}, { error: action.error });

    case "GET_PROFILE_START":
    case "UPDATE_PROFILE_START":
      return Object.assign({}, { isFetching: action.isFetching });

    case "GET_PROFILE_COMPLETE":
    case "UPDATE_PROFILE_COMPLETE":
      return Object.assign({}, action.json);

    default:
      return state;
  }
};

export default profileReducer;