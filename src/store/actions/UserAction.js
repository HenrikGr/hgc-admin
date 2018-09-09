/**
 * @prettier
 * @description: User action creator service
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import tokenAction from './TokenAction'
import profileAction from './ProfileAction'
import {
  RESET_ERROR
} from './constants'

/**
 * Helper function that dispatches actions from an array
 * @param array
 * @param fn
 * @returns {Promise<Array>}
 * @private
 */
async function dispatchProcessor(array, fn) {
  let results = []

  try {
    for (let i = 0; i < array.length; i++) {
      let r = await fn(array[i])
      results.push(r)
    }
  } catch (error) {
    return Promise.reject(error)
  }

  return Promise.resolve(results)
}

/**
 * Log in user
 * @param credentials
 * @returns {Function}
 * @public
 */
function logIn(credentials) {
  return dispatch => {
    let actions = []
    actions.push(tokenAction.get(credentials))
    actions.push(profileAction.getMe())

    // Dispatch actions from array
    dispatchProcessor(actions, dispatch).then(
      function(result) {
        console.log('All done', result)
        // all done here
        // array of data here in result
      },
      function(reason) {
        console.log('rejections', reason)
        // rejection happened
      }
    )
  }
}

/**
 * Re login if session is going to expire
 * @returns {Function}
 * @public
 */
function refreshSession() {
  return async function(dispatch) {
    await dispatch(tokenAction.refresh())
  }
}

/**
 * Logout
 * @returns {Function}
 * @public
 */
function logOut() {
  return async function(dispatch) {
    await dispatch(tokenAction.remove())
  }
}

/**
 * Reset validation errors from state
 * @returns {{type: string}}
 * @public
 */
function resetError() {
  return { type: RESET_ERROR }
}

/**
 * Interface constructor for user actions
 * @constructor
 */
function UserActionFactory() {
  return {
    logIn,
    refreshSession,
    logOut,
    resetError
  }
}

export default new UserActionFactory()
