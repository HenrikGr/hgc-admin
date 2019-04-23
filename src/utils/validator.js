/**
 * Description: Module providing a services object to validate input forms
 *
 * The services object is built upon a strategy pattern, meaning we will be
 * able to add validation function and types on the fly.
 *
 * There are some validation function defined such as;
 * - isNonEmpty, checks for non-empty values.
 * - isNumber, checks if a value is a number.
 * - isAlphaNum, checks if a value containing only letters and numbers.
 *
 * The services object also supports a configuration concept where we can
 * pre-define validation types and function to input field names.
 * This pre-definition is done via the config property og the validation object.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Import constants
import { PASS_6TO20_ONE_UPP_LOW_NUM } from "./constants";

/**
 * Validator object
 */
const validator = {
  types: {},
  config: {},

  validate(data) {
      let key;
      let isValid = true;

      let result = {
        error: {
          message: 'Validation error',
        }
      };

      for (key in data) {
        if (data.hasOwnProperty(key)) {
          let type = this.config[key]; // Get validation type
          let checker = this.types[type]; // Get the validation function for this type

          if (!type) {
            continue; // no need to validate
          }

          // No validation function for this type
          if (!checker) {
            return (new Error("Error in validation, no checker for " + type));
          }

          // Run the validation function
          if (!checker.validate(data[key])) {
            isValid = false;
            result.error[key] = checker.instructions;
          }
        }
      }

      if (!isValid) {
        return result;
      } else {
        return data;
      }
  }
};

// checks against password rules
validator.types.isRegEx = {
  validate: function(value) {
    return value.toString().match(PASS_6TO20_ONE_UPP_LOW_NUM);
  },
  instructions:
    "Value must be 6-20 long and at least one numeric, one uppercase and one lowercase"
};

validator.types.isRequired = {
  validate: function(value) {
    return value.toString() !== "";
  },
  instructions: "Value cannot be empty"
};

// checks if a value is a number
validator.types.isNumber = {
  validate: function(value) {
    return !isNaN(value);
  },
  instructions: "Value can only be a valid number, e.g. 1, 3.14 or 2010"
};

// checks if the value contains only letters and numbers
validator.types.isAlphaNum = {
  validate: function(value) {
    return !/[^a-z0-9]/i.test(value);
  },
  instructions:
    "Value can only contain characters and numbers, no special symbols"
};


// Set up validation types to input field names.
validator.config = {
  username: "isRequired",
  password: "isRegEx",
  scope: "isRequired",
};

/**
 * Export the services object
 */
export default validator;
