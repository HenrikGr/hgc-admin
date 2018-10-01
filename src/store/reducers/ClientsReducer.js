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
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENT_CREATE_SUCCESS,
  FETCH_CLIENT_UPDATE_SUCCESS,
  FETCH_CLIENT_DELETE_SUCCESS,
  CLIENT_SET_SELECTED,
  CLIENT_RESET_SELECTED,
  CLIENT_UPDATE_STATE
} from '../actions/constants'

/**
 * Clients state branch reducer
 * @param {object} state - clients branch of global state
 * @param {object} action - object with payload key, used to update state
 * @returns {object} - updated clients branch of the global state
 * @public
 */
const clientsReducer = (state = defaults.clients, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        selectedId: action.payload[0]._id,
        entity: action.payload[0],
        entities: action.payload
      }

    case FETCH_CLIENT_CREATE_SUCCESS:
      return {
        ...state,
        selectedId: action.payload._id,
        entity: action.payload,
        entities: [...state.entities, action.payload]
      }

    case FETCH_CLIENT_DELETE_SUCCESS:
      // Filter out the entity to be deleted
      const newEntities = state.entities.filter(entity => entity._id !== action.payload)
      return {
        ...state,
        selectedId: newEntities[0]._id,
        entity: newEntities[0],
        entities: newEntities
      }

    case FETCH_CLIENT_UPDATE_SUCCESS:
      return {
        ...state,
        entities: state.entities.map(entity => ((entity._id === action.payload._id ? action.payload: entity))),
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
        entity: action.payload
      }

    default:
      return state
  }
}

export default clientsReducer
