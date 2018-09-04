/**
 * @prettier
 *
 * @description Console logger middleware
 * The middleware logs action types to the console
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Prefix message to the console
const STR_CONSOLE_PREFIX = 'MIDDLEWARE: Executing action: '

/**
 * Console logger middleware
 * @function
 */
const consoleLogger = () => next => action => {
  console.log(STR_CONSOLE_PREFIX + action.type)
  return next(action)
}

export default consoleLogger
