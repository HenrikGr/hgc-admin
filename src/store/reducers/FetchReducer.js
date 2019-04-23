/**
 * @prettier
 * @description: Fetch reducers
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import defaults from '../DefaultState'
import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_SESSION_SUCCESS,
  FETCH_REFRESH_SESSION_SUCCESS,
  FETCH_ERROR
} from '../constants'

/**
 * Fetch reducer
 * @param {object} state - isFetching flag of global state
 * @param {object} action - object with payload key, used to update state
 * @returns {object} - updated status branch of the global state
 */
const fetchReducer = (state = defaults.isFetching, action) => {
  switch (action.type) {
    case FETCH_START:
      return true

    case FETCH_SUCCESS:
    case FETCH_SESSION_SUCCESS:
    case FETCH_REFRESH_SESSION_SUCCESS:
    case FETCH_ERROR:
      return false

    default:
      return state
  }
}

export default fetchReducer
