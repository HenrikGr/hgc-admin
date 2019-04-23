/**
 * @prettier
 * @description: Validation error
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Validation error
 * @typedef {Error} ValidationException
 * @property {string} name - name property
 * @property {string} message- message property
 * @property {Object} details - details property
 */

/**
 * Validation error
 * @extends Error
 * @class
 */
class ValidationError extends Error {
  /**
   * Validation error constructor
   * @param {string} message - message
   * @param {Object} details - error object
   * @constructor
   */
  constructor(message, details = {}) {
    super(message)
    this.name = 'Validation exception'
    this.message = message
    if (!(Object.keys(details).length === 0 && details.constructor === Object)) {
      this.details = details
    }
  }
}

export default ValidationError
