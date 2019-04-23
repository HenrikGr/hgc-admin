/**
 * @prettier
 * @description: Root reducer
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { combineReducers } from 'redux'
import statusReducer from './StatusReducer'
import errorReducer from './ErrorReducer'
import fetchReducer from './FetchReducer'
import sessionReducer from './SessionReducer'
import profileReducer from './ProfileReducer'
import usersReducer from './UsersReducer'
import clientsReducer from './ClientsReducer'

import defaultState from '../DefaultState'

// Action constant
import { REMOVE_SESSION } from '../constants'

/**
 * Application reducer that combine different branch reducers to one app reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const appReducer = combineReducers({
  status: statusReducer,
  error: errorReducer,
  isFetching: fetchReducer,
  session: sessionReducer,
  profile: profileReducer,
  users: usersReducer,
  clients: clientsReducer
})

/**
 * Root reducer to manage application state wide operations
 * @param {State} state - global state tree
 * @param {Object} action
 * @returns {*}
 */
const rootReducer = (state, action) => {
  switch (action.type) {
    // reset the state to default - used when user logging out or session times out
    case REMOVE_SESSION:
      return defaultState

    default:
      // Use the app reducer for all specific branches
      return appReducer(state, action)
  }
}

export default rootReducer
