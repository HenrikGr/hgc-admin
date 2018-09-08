/**
 * Description: ValidationException function
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * General validation error constructor
 * @param name
 * @param errors
 * @constructor
 */
function ValidationExceptions(name, errors) {
  this.name = name || "Validation exception";
  this.errors = errors
}
ValidationExceptions.prototype = Object.create(Error.prototype);
ValidationExceptions.prototype.constructor = ValidationExceptions;

/**
 * Entity validation error constructor
 * @param errors
 * @param entity
 * @constructor
 */
function EntityValidationError(errors, entity) {
  let entityError = { message: 'Validation error'};
  for (let key of Object.keys(entity)) {
    let error = (errors && errors.find && errors.find(entry => entry.dataPath && entry.dataPath.substring(1) === key));
    if (error && error.message) {
      entityError[key] = error.message;
    }
  }

  // Call the base validation error constructor
  ValidationExceptions.call(this, "Entity validation exception", entityError)
}
EntityValidationError.prototype = Object.create(ValidationExceptions.prototype);



export {
  EntityValidationError,
}