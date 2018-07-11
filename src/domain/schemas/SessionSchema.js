/**
 * Description: Session/Credential schema
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import Ajv from 'ajv';
import { isPassword } from './customKeywords';
import JSONSchema from './JSONSchema';
import schema from './json/credentials';
import ValidationException from './ValidationException';

const options = {
  allErrors: true,        // Get all errors att once
  removeAdditional: true  // Remove additional props if exist
};

/**
 * Compile the schema to construct a cached validator function
 * @type {ajv.ValidateFunction}
 */
const validator = new Ajv(options)
  .addKeyword('isPassword', isPassword)
  .compile(schema);

/**
 * Schema validator
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