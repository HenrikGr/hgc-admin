/**
 * @prettier
 * @description: Thunk middleware - middleware that allows action creators to return functions
 *
 * The returned functions can is mostly used to creates a series of action creators
 *
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Middleware function that return a function if the action creator is of type function.
 * Otherwise it returns the object.
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
