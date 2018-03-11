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
import reducers from "./reducers";
//import logger from "./middleware/logger";
import thunk from "./middleware/thunk";

// Add Redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Create the Redux store by calling Redux.createStore().
 */
export default createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
