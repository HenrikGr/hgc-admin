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

const validationFailed = error => ({
  type: "CLIENT_VALIDATION_FAILED",
  error
});

const fetchStart = (isFetching) => ({
  type: "FETCH_CLIENTS_STARTED",
  isFetching
});

const fetchFailed = error => ({
  type: "FETCH_CLIENTS_FAILED",
  error
});

const getClientsComplete = clients => ({
  type: "FETCH_CLIENTS_COMPLETE",
  clients
});

const createClientComplete = client => ({
  type: "CREATE_CLIENT_COMPLETE",
  client
});

const updateClientComplete = client => ({
  type: "UPDATE_CLIENT_COMPLETE",
  client
});

const deleteClientComplete = id => ({
  type: "DELETE_CLIENT_COMPLETE",
  id
});

const resetError = () => ({
  type: "RESET_ERROR"
});


/**
 * Get clients
 * @param params
 * @returns {Function}
 */
const getClients = params => {
  return function(dispatch, getState) {
    dispatch(fetchStart(true));
    clientService.getClients(params)
      .then(json => {
        dispatch(getClientsComplete(json));
      })
      .catch(json => {
        dispatch(fetchFailed(json));
      });
  };
};

const createClient = client => {
  return function(dispatch, getState) {
    const error = clientService.validateClient(client);
    if (error.message) {
      dispatch(validationFailed(error));
    } else {
      dispatch(fetchStart(true));
      clientService.createClient(client)
        .then(json => {
          dispatch(createClientComplete(json));
        })
        .catch(err => {
          dispatch(fetchFailed(err));
        })
    }
  }
};

const updateClientById = (id, client) => {
  return function(dispatch, getState) {
    const error = clientService.validateClient(client);
    if (error.message) {
      dispatch(validationFailed(error));
    } else {
      dispatch(fetchStart(true));
      clientService.updateClientById(id, client)
        .then(json => {
          dispatch(updateClientComplete(json));
        })
        .catch(err => {
          dispatch(fetchFailed(err));
        })
    }
  }
};

const deleteClientById = id => {
  return function(dispatch) {
    dispatch(fetchStart(true));
    clientService.deleteClientById(id)
      .then(() => {
        dispatch(deleteClientComplete(id));
      })
      .catch(err => {
        dispatch(fetchFailed(err));
      })
  }
};


export const ClientActionFactory = (() => {
  return {
    getClients,
    createClient,
    updateClientById,
    deleteClientById,
    resetError,
  }
});

export default ClientActionFactory();

