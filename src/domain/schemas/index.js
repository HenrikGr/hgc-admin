/**
 * Description: Schema helper function
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Ajc
import Ajv from 'ajv';
const ajv = new Ajv({
  allErrors: true,
  useDefaults: "shared",
  coerceTypes: "array",
  removeAdditional: true
});

/**
 * Error handler function to normalize validation error messages
 * @param errors
 * @returns {{message: string}}
 */
export const schemaErrorHandler = errors => {
  let error = {  message: '' };
  error.message = 'Validation error';
  errors.forEach(e => {
    let prop = e.dataPath.replace(".", "");
    error[prop] = e.message;
  });
  return error;
};

/**
 * Factory function to create validators based on schema
 * @param schema
 * @returns {ajv.ValidateFunction}
 */
const validatorFactory = schema => ajv.compile(schema);


/**
 * Default export Validator factory function
 */
export default validatorFactory;

