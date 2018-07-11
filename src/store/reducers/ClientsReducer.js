/**
 * Description: Module containing reducer for clients state
 *
 * The clients reducer function creates a new state based on the current state
 * and the description of the new state supplied by the clients action creators.
 *
 * GENERAL
 * Reducers are pure JavaScript functions that:
 * - Create a new state, given the current state and an action
 * - Centralize data mutations
 * - Can act on all or part of the state
 * - Can be combined and reused
 *
 * Because they're pure functions, reducers have no side effects,
 * so they're easy to read, test, and debug. And you can compose reducers,
 * which makes it easy to implement simple reducers that are concerned
 * with only a portion of the overall application state.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Initial state
import defaults, {
  appendElement,
  removeById,
  updateElement,
} from './DefaultState'

/**
 * Users state reducer
 * @param state
 * @param action
 * @returns {*}
 */
const clientsReducer = (state = defaults.clients, action) => {
  switch (action.type) {
    case "CLIENT_VALIDATION_FAILED":
      return { ...state, error: action.error };

    case "FETCH_CLIENTS_STARTED":
      return { ...state, isFetching: action.isFetching };
    case "FETCH_CLIENTS_FAILED":
      return { ...state, error: action.error, isFetching: false  };
    case "FETCH_CLIENTS_COMPLETE":
      return { ...state, docs: action.clients.docs, isFetching: false };

    case "CREATE_CLIENT_COMPLETE":
      return { ...state, docs: appendElement(state.docs, action.client), isFetching: false, error: {} };
    case "DELETE_CLIENT_COMPLETE":
      return { ...state, docs: removeById(state.docs, action.id), isFetching: false, error: {} };
    case "UPDATE_CLIENT_COMPLETE":
      console.log('ClientReducer: update client', action.client);
      return { ...state, docs: updateElement(state.docs, action.client), isFetching: false, error: {} };

    case "RESET_ERROR":
      return { ...state, error: {}, isFetching: false };

    default:
      return state;
  }
};

export default clientsReducer;
