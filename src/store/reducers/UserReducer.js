/**
 * @prettier
 * @description: user reducer
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import defaults from './DefaultState'
import {
  FETCH_TOKEN_SUCCESS,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_STATE
} from '../actions/constants'

/**
 * User reducer
 * @param {object} state - user branch of global state
 * @param {object} action - object with payload key, used to update state
 * @returns {object} - updated user branch of the global state
 */
const userReducer = (state = defaults.user, action) => {
  switch (action.type) {
    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.payload
      }

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload
      }

    case UPDATE_PROFILE_STATE:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload }
      }

    default:
      return state
  }
}

export default userReducer
