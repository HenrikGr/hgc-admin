/**
 * @prettier
 * @description: Error reducer
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import defaults from './DefaultState'
import {
  VALIDATION_ERROR,
  FETCH_VALIDATION_ERROR,
  FETCH_ERROR,
  RESET_ERROR
} from '../actions/constants'

/**
 * Error reducer
 * @param {object} state - error branch of global state
 * @param {object} action - object with payload key, used to update state
 * @returns {object} - updated status branch of the global state
 */
const errorReducer = (state = defaults.error, action) => {
  switch (action.type) {
    case VALIDATION_ERROR:
    case FETCH_VALIDATION_ERROR:
    case FETCH_ERROR:
      return action.payload

    case RESET_ERROR:
      return {}

    default:
      return state
  }
}

export default errorReducer
