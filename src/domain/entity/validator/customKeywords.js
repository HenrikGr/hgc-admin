/**
 * @prettier
 * @description: Custom keyword validators
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
// 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
const IS_PASSWORD_VALID = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
const isNotEmptyMsg = 'should NOT be empty'
const isPasswordMsg = 'password must be 6 to 20 characters and at least one numeric, one uppercase and one lowercase'

/**
 * Validate if a string is not empty
 */
export const isNotEmpty = {
  type: 'string',
  validate: function isNotEmpty(schema, data) {
    isNotEmpty.errors = [
      { keyword: 'isNotEmpty', message: isNotEmptyMsg, params: { keyword: 'isNotEmpty' } }
    ]
    return typeof data === 'string' && data.trim() !== ''
  },
  errors: true
}

/**
 * Validate if an array od strings are empty
 */
export const isNotEmptyArray = {
  type: 'array',
  validate: function isNotEmptyArray(schema, data) {
    isNotEmptyArray.errors = [
      { keyword: 'isNotEmptyArray', message: isNotEmptyMsg, params: { keyword: 'isNotEmptyArray' } }
    ]
    return typeof Array.isArray(data) && data.length !== 0
  },
  errors: true
}

/**
 * Validate if a string match the password policy
 */
export const isPassword = {
  type: 'string',
  validate: function isPassword(schema, data) {
    isPassword.errors = [
      { keyword: 'isPassword', message: isPasswordMsg, params: { keyword: 'isPassword' } }
    ]
    return data.match(IS_PASSWORD_VALID)
  },
  errors: true
}
