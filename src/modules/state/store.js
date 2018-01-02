/*!
 * Description: The Redux store module
 *
 * The state object för this application will contain;
 * - user, object about the current user that is logged in.
 * - status, string describing the status of the app
 *
 * Author:  Henrik Grönvall
 * File:
 * Version: 0.0.1
 * Created on 2016-10-16
 */
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import { logger, thunk } from './middleware';

/**
 * Create the Redux store by calling Redux.createStore().
 */
export default createStore(reducers, compose(applyMiddleware(logger, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f));