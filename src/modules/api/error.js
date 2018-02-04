/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

/**
 * Create a new object, that inherits from the Error constructor
 * @param status
 * @param code
 * @param more_info
 * @param message
 * @constructor
 */
function AppError(status, code, more_info, message) {
  this.status = status;
  this.code = code;
  this.more_info = more_info;
  this.message = message || 'App Error';
}
AppError.prototype = Object.create( Error.prototype );
AppError.prototype.constructor = AppError;

/**
 * Export application error class
 */
export default AppError