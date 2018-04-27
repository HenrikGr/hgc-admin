/**
 * Description
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Logger middleware
 * @param store
 */
const logger = store => next => action => {
  console.log("MIDDLEWARE: Executing action " + action.type);
  return next(action);
};

export default logger;
