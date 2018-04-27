/**
 * Description: The Redux store module
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers/RootReducers";
import thunk from "./middleware/thunk";

// Add Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Create the Redux store by calling Redux.createStore().
 */
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
