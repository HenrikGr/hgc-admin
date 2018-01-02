/*
 * Description: Module containing constants for the application
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-10-15
 */

/**
 * Password regular expression matching rules
 * @type {RegExp}
 */
// 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
const PASS_6TO20_ONE_UPP_LOW_NUM = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
// 7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter
const PASS_7TO15_FIRST_UPP_ONLY_CHR_NUM_UND =  /^[A-Za-z]\w{7,14}$/;
// 7 to 15 characters which contain at least one numeric digit and a special character
const PASS_7TO15_LEAST_ONE_NUM_SPEC =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
// 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
const PASS_8TO15_LEAST_ONE_LOW_UPP_NUM_SPEC =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;


/**
 * Text regular expression matching rules
 * @type {RegExp}
 */
const ONLY_LETTERS = /^[A-Za-z]+$/;
const ONLY_NUMBERS = /^[0-9]+$/;


/**
 * Export constants
 */
export {
  PASS_6TO20_ONE_UPP_LOW_NUM,
  PASS_7TO15_FIRST_UPP_ONLY_CHR_NUM_UND,
  PASS_7TO15_LEAST_ONE_NUM_SPEC,
  PASS_8TO15_LEAST_ONE_LOW_UPP_NUM_SPEC,
  ONLY_LETTERS,
  ONLY_NUMBERS
}