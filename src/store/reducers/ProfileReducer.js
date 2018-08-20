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
import {
  PROFILE_VALIDATION_FAILED,
  FETCH_PROFILE_STARTED,
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_STATE,
  RESET_PROFILE_ERROR,
} from '../actions/constants';


/**
 * Profile state reducer
 * @param {object} state - global state which defaults to the profile branch
 * @param {object} action - action creator object in the form { type: ACTION, payload: data }
 * @returns {*}
 */
const profileReducer = (state = defaults.profile, action) => {
  switch (action.type) {
    case PROFILE_VALIDATION_FAILED:
      return {
        ...state,
        error: action.payload
      };

    case FETCH_PROFILE_STARTED:
      return {
        ...state,
        error: {},
        isFetching: true
      };

    case FETCH_PROFILE_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        entity: action.payload,
        isFetching: false
      };

    case UPDATE_PROFILE_STATE:
      return {
        ...state,
        entity: {...state.entity, ...action.payload },
        error: {}
      };

    case RESET_PROFILE_ERROR:
      return {
        ...state,
        error: {}
      };

    default:
      return state;
  }
};

export default profileReducer;