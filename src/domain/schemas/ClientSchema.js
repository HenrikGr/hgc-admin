/**
 * Description: Client schema
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import Ajv from 'ajv';
import JSONSchema from './JSONSchema';
import schema from './json/client';
import ValidationException from './ValidationException';

// Ajv options for profile schema
const options = {
  allErrors: true,
  useDefaults: true,
  coerceTypes: "array",
  removeAdditional: true
};

// Compile client schema with options to get the validator
const validator = new Ajv(options).compile(schema);


/**
 * Client schema validator
 * @param model
 */
function schemaValidator(model) {

  // Validate the data model
  validator(model);

  // Trow error to be caught
  if (validator.errors && validator.errors.length) {
    throw new ValidationException(validator.errors)
  }
}

/**
 * export JSONSchema
 */
export default new JSONSchema(schema, schemaValidator);