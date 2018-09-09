/**
 * @prettier
 * @description: Client reducer
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import defaults from './DefaultState'
import {
  CLIENTS_GET_SUCCESS,
  //CLIENTS_UPDATE_SUCCESS,
  CLIENT_CREATE_SUCCESS,
  CLIENT_UPDATE_SUCCESS,
  CLIENT_DELETE_SUCCESS,
  CLIENT_SET_SELECTED,
  CLIENT_RESET_SELECTED,
  CLIENT_UPDATE_STATE
} from '../actions/constants'

// Array helper functions
import { appendElement, removeById, updateElement } from '../../utils/helper'

/**
 * Clients state branch reducer
 * @param {object} state - clients branch of global state
 * @param {object} action - object with payload key, used to update state
 * @returns {object} - updated clients branch of the global state
 * @public
 */
const clientsReducer = (state = defaults.clients, action) => {
  switch (action.type) {
    case CLIENTS_GET_SUCCESS:
      return {
        ...state,
        selectedId: action.payload[0]._id,
        entity: action.payload[0],
        entities: action.payload
      }

    case CLIENT_CREATE_SUCCESS:
      return {
        ...state,
        selectedId: action.payload._id,
        entity: action.payload,
        entities: appendElement(state.entities, action.payload)
      }

    case CLIENT_DELETE_SUCCESS:
      return {
        ...state,
        selectedId: state.entities[0]._id,
        entity: state.entities[0],
        entities: removeById(state.entities, action.payload)
      }

    case CLIENT_UPDATE_SUCCESS:
      return {
        ...state,
        entities: updateElement(state.entities, action.payload)
      }

    case CLIENT_SET_SELECTED:
      return {
        ...state,
        selectedId: action.payload._id,
        entity: action.payload
      }

    case CLIENT_UPDATE_STATE:
      return {
        ...state,
        entity: { ...state.entity, ...action.payload }
      }

    case CLIENT_RESET_SELECTED:
      return {
        ...state,
        selectedId: '',
        entity: { ...defaults.clients.entity }
      }

    default:
      return state
  }
}

export default clientsReducer
