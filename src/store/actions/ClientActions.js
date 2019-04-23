/**
 * @prettier
 * @description: Client action creator xhr
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { clientMgr } from '../../domain/entity'
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
 * Action creator - fetching clients by query parameters
 * @param {Object} params - query params object
 * @returns {Function}
 */
function findClientsByQuery(params) {
  return async function(dispatch) {
    try {
      let response = await clientMgr.findClients(params)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_CLIENTS_SUCCESS, payload: response.data })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator - persist the client services in global state
 * @returns {Function}
 */
function createClient() {
  return async function(dispatch, getState) {
    try {
      const { entity } = getState().clients
      dispatch({ type: FETCH_START })
      let response = await clientMgr.createClient(entity)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_CLIENT_CREATE_SUCCESS, payload: response })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator - persist client based on the client services stored in the global state
 * @returns {Function}
 */
function updateClient() {
  return async function(dispatch, getState) {
    try {
      const { entity } = getState().clients
      dispatch({ type: FETCH_START })
      let response = await clientMgr.updateClient(entity._id, entity)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_CLIENT_UPDATE_SUCCESS, payload: response })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator - remove client based on the client services stored in the global state
 * @returns {Function}
 * @public
 */
function removeClient() {
  return async function(dispatch, getState) {
    try {
      const { entity } = getState().clients
      dispatch({ type: FETCH_START })
      await clientMgr.deleteClient(entity._id)
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_CLIENT_DELETE_SUCCESS, payload: entity._id })
    } catch (err) {
      dispatch({ type: FETCH_ERROR, payload: err })
    }
  }
}

/**
 * Action creator - set selected client services in global state
 * @param {Object} client - client services to be stored in the global state
 * @returns {{type: string, payload: *}}
 */
function setSelectedClient(client) {
  return { type: CLIENT_SET_SELECTED, payload: client }
}

/**
 * Action creator - Reset the client services global state with default services
 * @returns {{type: string}}
 */
function resetSelectedClient() {
  return { type: CLIENT_RESET_SELECTED }
}

/**
 * Partial update selected client services from form inputs
 * @param {object} entity - object containing prop and value of the client services to be updated
 * @returns {{type: string, payload: *}}
 */
function updateClientState(entity) {
  return { type: CLIENT_UPDATE_STATE, payload: entity }
}

export default {
  findClientsByQuery,
  createClient,
  updateClient,
  removeClient,
  setSelectedClient,
  updateClientState,
  resetSelectedClient
}
