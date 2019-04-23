/**
 * @prettier
 * @description: Client reducer
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import defaults from '../DefaultState'
import {
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENT_CREATE_SUCCESS,
  FETCH_CLIENT_UPDATE_SUCCESS,
  FETCH_CLIENT_DELETE_SUCCESS,
  CLIENT_SET_SELECTED,
  CLIENT_RESET_SELECTED,
  CLIENT_UPDATE_STATE
} from '../constants'

/**
 * Clients state branch reducer
 * @param {Object} state - clients branch of global state
 * @param {Object} action - object with payload key, used to update state
 * @returns {*} - updated clients state branch of the global state
 */
const clientsReducer = (state = defaults.clients, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        entity: action.payload[0],
        entities: action.payload
      }

    case FETCH_CLIENT_CREATE_SUCCESS:
      return {
        ...state,
        entity: action.payload,
        entities: [...state.entities, action.payload]
      }

    case FETCH_CLIENT_DELETE_SUCCESS:
      // Filter out the services to be deleted
      const newEntities = state.entities.filter(entity => entity._id !== action.payload)
      return {
        ...state,
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
        entity: defaults.clients.entity
      }

    default:
      return state
  }
}

export default clientsReducer
