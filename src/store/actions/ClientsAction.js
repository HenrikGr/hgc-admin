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
  FETCH_CLIENTS_SUCCESS,
  FETCH_CLIENT_CREATE_SUCCESS,
  FETCH_CLIENT_UPDATE_SUCCESS,
  FETCH_CLIENT_DELETE_SUCCESS,
  CLIENT_SET_SELECTED,
  CLIENT_RESET_SELECTED,
  CLIENT_UPDATE_STATE
} from './constants'

/**
 * Action creator - create client
 * @returns {Function}
 * @public
 */
function create() {
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
          dispatch({ type: FETCH_CLIENT_CREATE_SUCCESS, payload: json })
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
function find(params) {
  return function(dispatch) {
    dispatch({ type: FETCH_START })
    clientAPI
      .findByQuery(params)
      .then(json => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: FETCH_CLIENTS_SUCCESS, payload: json.data })
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
function update() {
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
          dispatch({ type: FETCH_CLIENT_UPDATE_SUCCESS, payload: json })
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
function remove() {
  return function(dispatch, getState) {
    const { selectedId } = getState().clients
    dispatch({ type: FETCH_START })
    clientAPI
      .deleteById(selectedId)
      .then(() => {
        dispatch({ type: FETCH_SUCCESS })
        dispatch({ type: FETCH_CLIENT_DELETE_SUCCESS, payload: selectedId })
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
 * @param defaultEntry
 * @returns {{type: string, payload: *}}
 * @public
 */
function resetSelected(defaultEntry) {
  return { type: CLIENT_RESET_SELECTED, payload: defaultEntry }
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
 * Interface constructor to client action creators
 * @returns {object} - object with client actions
 * @constructor
 * @private
 */
function ClientActionFactory() {
  return {
    find,
    create,
    update,
    remove,
    resetError,
    setSelected,
    updateState,
    resetSelected
  }
}

export default new ClientActionFactory()
