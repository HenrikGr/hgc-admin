/*!
 * Description: Module to take care of application errors.
 *
 * This object is used to create application specific errors of response status is not valid.
 *
 * The REST API respond with a status code 422 if there is an "undefined" error.
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-08-02
 */

// Create a new object, that inherits from the Error constructor
function AppError( message, code ) {
  this.errors = {
    message: message,
    code: code || 401,
  };
  this.message = 'Application error';
}
AppError.prototype = Object.create( Error.prototype );
AppError.prototype.constructor = AppError;

/**
 * Export application error class
 */
export default AppError