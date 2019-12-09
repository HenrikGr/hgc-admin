/**
 * @prettier
 * @description: ValidationError class
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import invariant from 'fbjs/lib/invariant'

/**
 * Validation exception error object
 * @typedef {Object} ValidationException
 * @property {String} name - name property
 * @property {String} message - message property
 * @property {Object} details - details property
 * @property {Object} stack - stack trace
 */

/**
 * Class representing a ValidationError
 */
class ValidationError extends Error {
  /**
   * ValidationError constructor creates an validation error object
   * @param {String} message - message
   * @param {Object} details - error details as key value pairs
   * @param {Object} params - remaining arguments passed to parent constructor
   */
  constructor(message, details, ...params) {
    // noinspection JSCheckFunctionSignatures
    /**
     * Pass remaining arguments (including vendor specific ones) to Error constructor
     */
    super(...params)

    /**
     * Throw an error in development node for missing argument
     */
    invariant(
      typeof message === 'string' || message instanceof String,
      'The message argument must be a string and not empty'
    )

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }

    /**
     * ValidationException name
     * @type {String}
     */
    this.name = 'ValidationException'

    /**
     * Message property
     * @type {String} message - message
     */
    this.message = message

    /**
     * Custom validation details
     * @type {Object} details - error details as key value pairs
     */
    this.details = details
  }
}

module.exports = ValidationError
