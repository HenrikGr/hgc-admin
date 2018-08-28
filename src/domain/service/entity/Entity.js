/**
 * Description: EntityModel class
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import { EntityValidationError } from './ValidationException';
import Ajv from "ajv";
import { isNotEmpty, isNotEmptyArray, isPassword } from "./customKeywords";

/**
 * EntityModel class
 */
export default class Entity {
  constructor(schema, {allErrors = true, useDefaults = true, removeAdditional = true, ...props} = {}) {
    this._schema = schema;
    this._schemaId = this._schema.$id;
    this._schemaType = this._schema.type;

    // Set default entity type to either object or array
    this._entity = this._schemaType === 'object' ? {} : [];

    // Internal ajv validator
    this._validator = new Ajv({
      allErrors: allErrors,
      useDefaults: useDefaults,
      removeAdditional: removeAdditional,
      coerceTypes: 'array',
      ...props,
    }).addKeyword('isNotEmpty', isNotEmpty)
      .addKeyword('isNotEmptyArray', isNotEmptyArray)
      .addKeyword('isPassword', isPassword)
      .compile(schema);

    if (this._schemaId ==="http://hgc.se/client.json") {
      let test = {
        grants: ['password'],
        redirectUris: ["http://localhost:3000/callback"],
        name: "HGC-OAUTH",
        scope: "admin account test",
      };
      let result = this._validator(test);
      console.log(result, this._validator.errors);
    }

    // Build default entity from the schema
    // TODO: Warn if not able to create default entity
    this._validator(this._entity);
  }

  /**
   * Get ajv error message object
   * @param {string} name - name of a field
   * @param {object} error - ValidationException error object
   * @returns {object} - ajv error object
   */
  getError(name, error) {
    return (
      error &&
      error.details &&
      error.details.find &&
      error.details.find(detail => detail.dataPath && detail.dataPath.substring(1) === name)
    );
  }

  /**
   * Get the error message as string for the named fields
   * @param {string} name - name of field
   * @param {object } error - ValidationException object
   * @returns {string} - the error message
   */
  getErrorMessage(name, error) {
    const scopedError = this.getError(name, error) || {};
    return (scopedError && scopedError.message) || '';
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Get all error messages as an array
   * @param {object} error - ValidationException object
   * @returns {array} - array of error messages
   */
  getErrorMessages(error) {
    if (error) {
      if (Array.isArray(error.details)) {
        return error.details.reduce((acc, {message}) => acc.concat(message), []);
      }
      return [error.message || error];
    }
    return [];
  }

  /**
   * Get the default entity object with default values by looking
   * up the the schema, field definitions and initial values from the
   * JSONSchema instance
   */
  getEntity() {
    return this._entity;
  }

  /**
   * Entity validator function that throws an ValidationException error on failure
   * @param {object} entity - entity object to be validated
   */
  validate(entity) {
    this._validator(entity);

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
  isValid(entity) {
    try {
      this.validate(entity);
    } catch (validationException) {
      return validationException.errors
    }
    return entity;
  }
}