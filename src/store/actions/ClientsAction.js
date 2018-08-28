/**
 * Description: Module containing action creators for the clients state.
 *
 * The clients actions consist of remote CRUD operations to retrieve client
 * information to the state.
 *
 * There is also helpers action creators that describe the new state that should be set
 * during the remote calls in case of start, success or failure.
 *
 * The remote calls using clients service module that contains business logic
 * for client information.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import clientService from "../../domain/service/Client";
import {
  LOG_STATUS,
  CLIENT_VALIDATION_FAILED,
  CLIENTS_FETCHING,
  CLIENTS_ERROR,
  CLIENTS_GET_SUCCESS,
  //CLIENTS_UPDATE_SUCCESS,
  CLIENT_CREATE_SUCCESS,
  CLIENT_UPDATE_SUCCESS,
  CLIENT_DELETE_SUCCESS,
  CLIENT_RESET_ERROR
} from "./constants";

/**
 * Action creator - create client
 * @param {object} client - user entity object
 * @returns {Function}
 */
function createClient(client) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Start create user" });
    const errors = clientService.validate(client);
    if (errors.message) {
      dispatch({ type: CLIENT_VALIDATION_FAILED, payload: errors });
    } else {
      dispatch({ type: CLIENTS_FETCHING });
      clientService.create(client)
        .then(json => {
          dispatch({ type: CLIENT_CREATE_SUCCESS, payload: json });
        })
        .catch(errors => {
          dispatch({ type: CLIENTS_ERROR, payload: errors });
        })
    }
  }
}

/**
 * Action creator - fetching clients information
 * @param {object} params - query params
 * @returns {Function}
 */
function getClients(params) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Start get clients" });
    dispatch({ type: CLIENTS_FETCHING });
    clientService.findByQuery(params)
      .then(json => {
        dispatch({ type: CLIENTS_GET_SUCCESS, payload: json.docs });
      })
      .catch(errors => {
        dispatch({ type: CLIENTS_ERROR, payload: errors });
      })
  };
}

/**
 * Action creator - updating client by id
 * @param {string} id - client entity id string
 * @param {object} client - client entity object
 * @returns {Function}
 */
function updateClientById(id, client) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Update client by id: " + id });
    const errors = clientService.validate(client);
    if (errors.message) {
      dispatch({ type: CLIENT_VALIDATION_FAILED, payload: errors });
    } else {
      dispatch({ type: CLIENTS_FETCHING });
      clientService.updateById(id, client)
        .then(json => {
          dispatch({ type: CLIENT_UPDATE_SUCCESS, payload: json });
        })
        .catch(errors => {
          dispatch({ type: CLIENTS_ERROR, payload: errors });
        })
    }
  }
}

/**
 * Action creator - delete client by id
 * @param {string} id - client entity id string
 * @returns {Function}
 */
function deleteClientById(id) {
  return function(dispatch) {
    dispatch({ type: LOG_STATUS, payload: "Delete client by id: " + id });
    dispatch({ type: CLIENTS_FETCHING });
    clientService.deleteById(id)
      .then(() => {
        dispatch({ type: CLIENT_DELETE_SUCCESS, payload: id });
      })
      .catch(errors => {
        dispatch({ type: CLIENTS_ERROR, payload: errors });
      })
  }
}

/**
* Action creator - Used to reset error
* @returns {{type: string}}
*/
function resetError() {
  return { type: CLIENT_RESET_ERROR }
}

/**
 * Factory for clients action creator interface
 * @constructor
 */
export const ClientActionFactory = (() => {
  return {
    getClients,
    createClient,
    updateClientById,
    deleteClientById,
    resetError,
  }
});

// Export the interface
export default new ClientActionFactory();

