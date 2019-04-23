/**
 * @prettier
 * @description: Error reducer
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import defaults from '../DefaultState'
import {
  VALIDATION_ERROR,
  FETCH_VALIDATION_ERROR,
  FETCH_ERROR,
  RESET_ERROR
} from '../constants'

/**
 * Error state reducer
 * @param {ValidationException} state
 * @param action
 * @returns {*}
 */
const errorReducer = (state = defaults.error, action) => {
  switch (action.type) {
    case VALIDATION_ERROR:
    case FETCH_VALIDATION_ERROR:
    case FETCH_ERROR:
      // Throw Invariant violations
      if (action.payload.name === 'Invariant Violation') throw action.payload
      return action.payload

    case RESET_ERROR:
      return {}

    default:
      return state
  }
}

export default errorReducer
