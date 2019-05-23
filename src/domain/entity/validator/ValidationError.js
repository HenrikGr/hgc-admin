/**
 * @prettier
 * @description: ValidationError class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */

/**
 * Validation error
 * @typedef {Error} ValidationException
 * @property {String} name - name property
 * @property {String} message- message property
 * @property {Object} details - details property
 */
class ValidationError extends Error {
  constructor(message, details, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }

    this.name = 'Validation exception'
    this.message = message
    if (!(Object.keys(details).length === 0 && details.constructor === Object)) {
      this.details = details
    }
  }
}

export default ValidationError
