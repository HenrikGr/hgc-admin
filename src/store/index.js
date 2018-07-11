/**
 * Description: The Redux store module
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import reducer from "./reducers/RootReducers";
import thunk from "./middleware/thunk";

/**
 * Create store with root reducer, and using redux dev tools extension
 * @see https://github.com/zalmoxisus/redux-devtools-extension
 * @type {*}
 */
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

export default store;
