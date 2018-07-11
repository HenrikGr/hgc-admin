/**
 * Description: Profile schema
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import Ajv from 'ajv';
import { isNotEmpty } from './customKeywords';
import JSONSchema from './JSONSchema';
import schema from './json/profile';
import ValidationException from './ValidationException';

const options = {
  allErrors: true,
  useDefaults: true,
  removeAdditional: true
};

// Compile schema with options to get the validator
const validator = new Ajv(options)
  .addKeyword('isNotEmpty', isNotEmpty)
  .compile(schema);

/**
 * Schema validator
 * @param model
 */
function schemaValidator(model) {
  validator(model);
  if (validator.errors && validator.errors.length) {
    throw new ValidationException(validator.errors)
  }
}

export default new JSONSchema(schema, schemaValidator);