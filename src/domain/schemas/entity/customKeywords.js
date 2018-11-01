/**
 * @prettier
 * @description: Custom keyword validation
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
const IS_PASSWORD_VALID = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
const isNotEmptyMsg = 'must have a value'
const isPasswordMsg = 'password must be 6 to 20 characters and at least one numeric, one uppercase and one lowercase'

/**
 * Custom validation function
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
 * Custom validation function
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
 * Custom validation function
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