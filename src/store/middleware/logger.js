/**
 * @prettier
 * @description: Console logger middleware
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Message prefix
 * @type {string}
 */
const STR_CONSOLE_PREFIX = 'MIDDLEWARE: Executing action: '

/**
 * Console logger middleware
 * @param store
 * @returns {function(*): function(*=): *}
 */
const consoleLogger = store => next => action => {
  console.log(STR_CONSOLE_PREFIX + action.type)
  return next(action)
}

export default consoleLogger
