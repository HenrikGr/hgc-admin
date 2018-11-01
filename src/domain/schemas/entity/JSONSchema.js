/**
 * @prettier
 * @description: JSONSchema services based on Ajv
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import Ajv from 'ajv'
import { isNotEmpty, isNotEmptyArray, isPassword } from './customKeywords'
import { EntityValidationError } from './ValidationException'

/**
 * JSONSchema class
 * @class
 * @constructor
 * @public
 */
export default class JSONSchema {
  constructor(
    schema,
    { allErrors = true, useDefaults = true, removeAdditional = true, ...props } = {}
  ) {
    this._schema = schema
    this.options = {
      allErrors: allErrors,
      useDefaults: useDefaults,
      removeAdditional: removeAdditional,
      coerceTypes: 'array',
      ...props
    }

    // Create a validator function that are cached in ajv
    this._validator = new Ajv(this.options)
      .addKeyword('isNotEmpty', isNotEmpty)
      .addKeyword('isNotEmptyArray', isNotEmptyArray)
      .addKeyword('isPassword', isPassword)
      .compile(this._schema)

    // Default data used to compile an object of default values from the schema
    this._defaultEntity = this._schema.type === 'object' ? {} : []
    this._validator(this._defaultEntity)
  }

  /**
   * Expose the schema
   * @returns {*}
   */
  getSchema() {
    return this._schema
  }

  /**
   * Get the default entity object with default values by looking
   * up the the schema, field definitions and initial values from the
   * JSONSchema instance
   * @returns {*}
   */
  getEntity() {
    return this._defaultEntity
  }

  /**
   * Entity validator function that throws an ValidationException error on failure
   * @param {object} entity - entity object to be validated
   */
  isValid(entity) {
    this._validator(entity)

    // if error throw a ValidationException error
    if (this._validator.errors && this._validator.errors.length) {
      throw new EntityValidationError(this._validator.errors, entity)
    }
  }

  /**
   * Validation error checker
   * @param {object} entity - entity object to be validated
   * @returns {object} - if valid returns the entity otherwise an validationException
   */
  validate(entity) {
    try {
      this.isValid(entity)
    } catch (validationException) {
      return validationException.errors
    }
    return entity
  }
}
