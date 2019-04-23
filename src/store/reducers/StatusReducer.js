/**
 * @prettier
 * @description: Reducers
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import defaults from '../DefaultState'
import { LOG_STATUS } from '../constants'

/**
 * Status state branch reducer
 * @param {object} state - status branch of global state
 * @param {object} action - object with payload key, used to update state
 * @returns {object} - updated status branch of the global state
 */
const statusReducer = (state = defaults.status, action) => {
  switch (action.type) {
    case LOG_STATUS:
      return action.payload
    default:
      return state
  }
}

export default statusReducer
