/**
 * @prettier
 * @description: Client action creator xhr
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import ClientAPI from '../../domain/xhr/ClientAPI'
import {
  //VALIDATION_ERROR,
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENT_CREATE_SUCCESS,
  FETCH_CLIENT_UPDATE_SUCCESS,
  FETCH_CLIENT_DELETE_SUCCESS,
  CLIENT_SET_SELECTED,
  CLIENT_RESET_SELECTED,
  CLIENT_UPDATE_STATE
} from '../constants'

/**
 * ClientAPI instance
 * @type {ClientAPI}
 */
const clientAPI = new ClientAPI()

/**
 * Action creator - fetching clients by query parameters
 * @param {Object} params - query params object
 * @returns {Function}
 */
export function findClientsByQuery(params) {
  return async function(dispatch) {
    try {
      dispatch({ type: FETCH_SUCCESS })
      let response = await clientAPI.findClients(params)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_CLIENTS_SUCCESS, payload: response.data })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator - persist the dao services in global state
 * @returns {Function}
 */
export function createClient() {
  return async function(dispatch, getState) {
    try {
      const { entity } = getState().clients
      dispatch({ type: FETCH_START })
      let response = await clientAPI.createClient(entity)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_CLIENT_CREATE_SUCCESS, payload: response })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator - persist dao based on the dao services stored in the global state
 * @returns {Function}
 */
export function updateClient() {
  return async function(dispatch, getState) {
    try {
      const { entity } = getState().clients
      console.log('state: ', entity)
      dispatch({ type: FETCH_START })
      let response = await clientAPI.updateClientById(entity._id, entity)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_CLIENT_UPDATE_SUCCESS, payload: response })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator - remove dao based on the dao services stored in the global state
 * @returns {Function}
 * @public
 */
export function removeClient() {
  return async function(dispatch, getState) {
    try {
      const { entity } = getState().clients
      dispatch({ type: FETCH_START })
      await clientAPI.deleteClientById(entity._id)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_CLIENT_DELETE_SUCCESS, payload: entity._id })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator - set selected dao services in global state
 * @param {Object} client - dao services to be stored in the global state
 * @returns {{type: string, payload: *}}
 */
export function setSelectedClient(client) {
  return { type: CLIENT_SET_SELECTED, payload: client }
}

/**
 * Action creator - Reset the dao services global state with default services
 * @returns {{type: string}}
 */
export function resetSelectedClient() {
  return { type: CLIENT_RESET_SELECTED }
}

/**
 * Partial update selected dao services from form inputs
 * @param {object} entity - object containing prop and value of the dao services to be updated
 * @returns {{type: string, payload: *}}
 */
export function updateClientState(entity) {
  return { type: CLIENT_UPDATE_STATE, payload: entity }
}

