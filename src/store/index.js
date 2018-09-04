/**
 * @prettier
 *
 * @description: The module creates the redux store
 *
 * When creating the store we are setting up the root reducer,
 * redux dev tools and applying the middleware to use
 *
 * For more information about the redux dev tools
 * @see https://github.com/zalmoxisus/redux-devtools-extension
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import rootReducer from './reducers/RootReducers'
import thunk from './middleware/thunk'

/**
 * Create the store
 * @type {*}
 */
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
