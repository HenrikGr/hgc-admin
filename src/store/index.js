/**
 * @prettier
 * @description: The application store managing the global state tree
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import rootReducer from './reducers'
import thunk from './middleware/thunk'
import logger from './middleware/logger'
//import sessionPersist from './middleware/session-persist'

/**
 * Store that manages the global state tree
 */
export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))
