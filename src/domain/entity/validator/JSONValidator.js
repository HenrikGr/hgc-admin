/**
 * @prettier
 * @description: JSONValidator services based on Ajv
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import Ajv from 'ajv'
import { isNotEmpty, isNotEmptyArray, isPassword } from './customKeywords'
import ValidationError from './ValidationError'

/**
 * JSONValidator
 * The validator validates JSON schema, parsing validation error messages on failures,
 * provide default values for schema entities, etc
 * @constructor
 */
class JSONValidator {
  /**
   * JSONValidator Constructor
   * @param {Object} schema - JSON schema to be used for validation
   * @param {Object} options - configuration options for the validator
   * @param {Boolean} options.allErrors - ajv validator to report all errors at once
   * @param {Boolean} options.useDefaults - ajv validator to use default values from schemas
   * @param {Boolean} options.removeAdditional - ajv validator to remove additional properties
   */
  constructor(
    schema,
    { allErrors = true, useDefaults = true, removeAdditional = true, coerceTypes = 'array' } = {}
  ) {
    /**
     * Instance schema object
     * @type {Object}
     * @private
     */
    this._schema = schema

    /**
     * Compiled instance validator
     * @type {ajv.ValidateFunction}
     * @private
     */
    this._validator = new Ajv({
      allErrors: allErrors,
      useDefaults: useDefaults,
      removeAdditional: removeAdditional,
      coerceTypes: coerceTypes
    })
      .addKeyword('isNotEmpty', isNotEmpty)
      .addKeyword('isNotEmptyArray', isNotEmptyArray)
      .addKeyword('isPassword', isPassword)
      .compile(this._schema)

    /**
     * Default entity instance
     * @type {Object | Array}
     * @private
     */
    this._defaultEntity = this._schema.type === 'object' ? {} : []

    /**
     * Update the default entity object with default values from the schema
     */
    this._validator(this._defaultEntity)
  }

  /**
   * JSON Schema object
   * @returns {Object}
   * @public
   */
  get schema() {
    return this._schema
  }

  /**
   * Default entity
   * @returns {Object|Array}
   */
  get defaultEntity() {
    return this._defaultEntity
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Get all error messages
   * @param {*} error
   * @returns {*}
   */
  getErrorMessages(error) {
    if (error) {
      if (Array.isArray(error)) {
        return error.reduce((acc, current) => {
          if (current.dataPath === '') {
            if (current.params.missingProperty) {
              acc[current.params.missingProperty] = 'is required'
            }
            if (current.params.additionalProperty) {
              acc[current.params.additionalProperty] = current.message
            }
          } else {
            acc[current.dataPath.substring(1)] = current.message
          }
          return acc
        }, {})
      }
      return [error.message || error]
    }
    return []
  }

  /**
   * Validate entity object
   * @param {Object} entity - entity to be validated
   * @returns {Object} - entity on success and may also mutate the original entity (remove additional properties)
   * @throws {ValidationError} - in validation failure
   */
  isValid(entity) {
    this._validator(entity)
    if (this._validator.errors && this._validator.errors.length) {
      throw new ValidationError('Validation error', this.getErrorMessages(this._validator.errors))
    }
    return entity
  }

  /**
   * Validation checker
   * @param {Object} entity - entity object to be validated
   * @returns {Object|boolean} - the entity object if valid, otherwise false
   */
  validate(entity) {
    this._validator(entity)
    if (this._validator.errors && this._validator.errors.length) {
      return false
    }
    return entity
  }
}

export default JSONValidator
