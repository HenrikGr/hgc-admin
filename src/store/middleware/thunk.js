/**
 * @prettier
 *
 * @description: Thunk middleware
 * Redux middleware that allow redux action creators to return
 * functions as well. Redux does not support this out of box.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Middleware function that return a function if the action
 * creator is of type function. Otherwise it returns the object.
 * @param extraArgument
 * @returns {function({dispatch?: *, getState?: *}): function(*): function(*=)}
 * @constructor
 */
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument)
    }

    return next(action)
  }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware
export default thunk
