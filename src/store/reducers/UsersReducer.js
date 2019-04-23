/**
 * @prettier
 * @description: Module containing reducer for users state
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import defaults from '../DefaultState'
import {
  USERS_GET_SUCCESS,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS
} from '../constants'

// Array helper functions
import { appendElement, removeById, updateElement } from '../../utils/helper'

/**
 * Users state branch reducer
 * @param {object} state - users branch of global state
 * @param {object} action - object with payload key, used to update state
 * @returns {object} - updated users branch of the global state
 */
const usersReducer = (state = defaults.users, action) => {
  switch (action.type) {
    case USERS_GET_SUCCESS:
      return {
        ...state,
        entities: action.payload.data,
      }

    case USER_CREATE_SUCCESS:
      return {
        ...state,
        entities: appendElement(state.entities, action.payload),
      }

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        entities: removeById(state.entities, action.payload),
      }

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        entities: updateElement(state.entities, action.payload),
      }

    default:
      return state
  }
}

export default usersReducer
