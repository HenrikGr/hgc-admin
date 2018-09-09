/**
 * @prettier
 * @description: Root reducer
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import { combineReducers } from 'redux'
import statusReducer from './StatusReducer'
import errorReducer from './ErrorReducer'
import fetchReducer from './FetchReducer'
import userReducer from './UserReducer'
import usersReducer from './UsersReducer'
import clientsReducer from './ClientsReducer'

// default/initial global state
import defaultState from './DefaultState'

// Action constant
import { REMOVE_TOKEN } from '../actions/constants'

/**
 * Combine different state branch reducers to one app reducer
 * @type {Reducer<any>}
 */
const appReducer = combineReducers({
  status: statusReducer,
  error: errorReducer,
  isFetching: fetchReducer,
  user: userReducer,
  users: usersReducer,
  clients: clientsReducer
})

/**
 * A root reducer to manage state wide operations
 * @see https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
 * @param {object} state - global state
 * @param {object} action - object with payload key, used to update state
 * @returns {object} - updated global state or the combined branch reducers
 */
const rootReducer = (state, action) => {
  switch (action.type) {
    // reset the state to default - used when user logging out or session times out
    case REMOVE_TOKEN:
      return defaultState

    default:
      // Use the app reducer for all specific branches
      return appReducer(state, action)
  }
}

export default rootReducer
