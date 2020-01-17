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
 * Validation of JSON Schemas
 * The validator validates JSON schema parsing validation error messages on failures,
 * provide default values for schema entities, etc
 *
 * @class
 */
class JSONValidator {
  /**
   * JSONValidator Constructor
   * @param {Object} schema - JSON schema to be used for validation
   * @param {Object} options - options passed to the compiled validator function instance
   * @param {Boolean} options.allErrors - report all errors at once
   * @param {Boolean} options.useDefaults - use default values from models
   * @param {Boolean} options.removeAdditional - remove additional properties
   * @param {String} options.coerceTypes - coerce data types
   */
  constructor(
    schema,
    { allErrors = true, useDefaults = true, removeAdditional = true, coerceTypes = 'array' } = {}
  ) {
    /**
     * Schema object instance
     * @type {Object}
     * @private
     */
    this._schema = schema

    /**
     * Compiled validation function instance
     *
     * This function has properties errors and schema.
     * Errors encountered during the last validation are assigned to errors property
     * (it is assigned null if there was no errors). schema property contains the
     * reference to the original schema
     * @type {ajv.ValidateFunction}
     * @private
     */
    this._compiledValidator = new Ajv({
      allErrors: allErrors,
      useDefaults: useDefaults,
      removeAdditional: removeAdditional,
      coerceTypes: coerceTypes
    })
      .addKeyword('isNotEmpty', isNotEmpty) // Add custom validation keyword to Ajv instance.
      .addKeyword('isNotEmptyArray', isNotEmptyArray)
      .addKeyword('isPassword', isPassword)
      .compile(this._schema)

    /**
     * Default entity property instance
     * @type {Object|Array}
     * @private
     */
    this._defaultEntity = this._schema.type === 'object' ? {} : []

    /**
     * Update the default entity property with default values from the schema
     * The validator instance will update the defaultEntity property instance
     */
    if (useDefaults) {
      this._compiledValidator(this._defaultEntity)
    }
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
   * @returns {boolean|Object|Array}
   */
  get defaultEntity() {
    return this._defaultEntity
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Get all error messages
   * @param {Array<ErrorObject>|null|undefined} error
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
   * @throws {ValidationException} - in validation failure
   */
  isValid(entity) {
    this._compiledValidator(entity)
    if (this._compiledValidator.errors && this._compiledValidator.errors.length) {
      throw new ValidationError('Validation error', this.getErrorMessages(this._compiledValidator.errors))
    }
    return entity
  }

  /**
   * Validation checker
   * @param {Object} entity - entity object to be validated
   * @returns {Object|boolean} - the entity object if valid, otherwise false
   */
  validate(entity) {
    this._compiledValidator(entity)
    if (this._compiledValidator.errors && this._compiledValidator.errors.length) {
      return false
    }
    return entity
  }
}

export default JSONValidator
