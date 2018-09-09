/**
 * @prettier
 * @description: Client action creator service
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import clientSchema from '../../domain/schemas/Client'
import clientAPI from '../../domain/service/Client'
import {
  VALIDATION_ERROR,
  //FETCH_VALIDATION_ERROR,
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET_ERROR,
  CLIENTS_GET_SUCCESS,
  //CLIENTS_UPDATE_SUCCESS,
  CLIENT_CREATE_SUCCESS,
  CLIENT_UPDATE_SUCCESS,
  CLIENT_DELETE_SUCCESS,
  CLIENT_SET_SELECTED,
  CLIENT_RESET_SELECTED,
  CLIENT_UPDATE_STATE
} from './constants'

/**
 * Action creator - create client
 * @returns {Function}
 * @public
 */
function createClient() {
  return function(dispatch, getState) {
    const { entity } = getState().clients
    const errors = clientSchema.validate(entity)
    if (errors.message) {
      dispatch({ type: VALIDATION_ERROR, payload: errors })
    } else {
      dispatch({ type: FETCH_START })
      clientAPI
        .create(entity)
        .then(json => {
          dispatch({ type: FETCH_SUCCESS })
          dispatch({ type: CLIENT_CREATE_SUCCESS, payload: json })
        })
        .catch(errors => {
          dispatch({ type: FETCH_ERROR, payload: errors })
        })
    }
  }
}

/**
 * Action creator - fetching clients information
 * @param {object} params - query params
 * @returns {Function}
 * @public
 */
function getClients(params) {
  return function(dispatch) {
    dispatch({ type: FETCH_START })
    clientAPI
      .findByQuery(params)
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: CLIENTS_GET_SUCCESS, payload: json.docs })
      })
      .catch(errors => {
        dispatch({ type: FETCH_ERROR, payload: errors })
      })
  }
}

/**
 * Action creator - updating client by id
 * @returns {Function}
 * @public
 */
function updateClientById() {
  return function(dispatch, getState) {
    const { selectedId, entity } = getState().clients
    const errors = clientSchema.validate(entity)
    if (errors.message) {
      dispatch({ type: VALIDATION_ERROR, payload: errors })
    } else {
      dispatch({ type: FETCH_START })
      clientAPI
        .updateById(selectedId, entity)
        .then(json => {
          dispatch({ type: FETCH_SUCCESS })
          dispatch({ type: CLIENT_UPDATE_SUCCESS, payload: json })
        })
        .catch(errors => {
          dispatch({ type: FETCH_ERROR, payload: errors })
        })
    }
  }
}

/**
 * Action creator - delete client by id
 * @returns {Function}
 * @public
 */
function deleteClientById() {
  return function(dispatch, getState) {
    const { selectedId } = getState().clients
    dispatch({ type: FETCH_START })
    clientAPI
      .deleteById(selectedId)
      .then(() => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: CLIENT_DELETE_SUCCESS, payload: selectedId })
      })
      .catch(errors => {
        dispatch({ type: FETCH_ERROR, payload: errors })
      })
  }
}

/**
 * Action creator - Used to reset error
 * @returns {{type: string}}
 * @public
 */
function resetError() {
  return { type: RESET_ERROR }
}

/**
 * Action creator - set selected data (selectedId, entry)
 * @param {object} entry - client entry with ._id as selectedId
 * @returns {{type: string, payload: *}}
 * @public
 */
function setSelected(entry) {
  return { type: CLIENT_SET_SELECTED, payload: entry }
}

/**
 * Reset selected data
 * @returns {{type: string}}
 * @public
 */
function resetSelected() {
  return { type: CLIENT_RESET_SELECTED }
}

/**
 * Update selected entity from input values
 * @param value
 * @returns {{type: string, payload: *}}
 * @public
 */
function updateState(value) {
  return { type: CLIENT_UPDATE_STATE, payload: value }
}

/**
 * Interface constructor for clients action creators
 * @constructor
 * @private
 */
export const ClientActionFactory = () => {
  return {
    getClients,
    createClient,
    updateClientById,
    deleteClientById,
    resetError,
    setSelected,
    updateState,
    resetSelected
  }
}

export default new ClientActionFactory()
