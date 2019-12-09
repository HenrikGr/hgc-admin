import ValidationError from '../ValidationError'
import JSONValidator from '../JSONValidator'
import schema from './mock'

/**
 * The JSONValidator to be tested
 */
describe('JSONValidator', () => {
  const options = {
    allErrors: true,
    useDefaults: true,
    removeAdditional: true
  }

  const validator = new JSONValidator(schema, options)

  describe('constructor', () => {
    test('Instance is defined - with correct properties and methods', () => {
      expect(validator).toBeDefined()
      expect(validator).toHaveProperty('_compiledValidator')
      expect(validator).toHaveProperty('defaultEntity')
      expect(validator).toHaveProperty('schema')

      expect(validator).toHaveProperty('getErrorMessages')
      expect(validator).toHaveProperty('isValid')
      expect(validator).toHaveProperty('validate')
    })
  })

  describe('getErrorMessages', () => {
    test('getErrorMessage - works without error object', () => {
      expect(validator.getErrorMessages()).toEqual([])
    })

    test('getErrorMessage - works with other errors', () => {
      expect(validator.getErrorMessages('correct')).toEqual(['correct'])
      expect(validator.getErrorMessages(999999999)).toEqual([999999999])
    })

    test('getErrorMessage - works with Error', () => {
      expect(validator.getErrorMessages(new Error('correct'))).toEqual(['correct'])
    })

    test('getErrorMessage - works with ValidationError', () => {
      expect(validator.getErrorMessages(new ValidationError('correct'))).toEqual(['correct'])
    })

    test('getErrorMessage - works with required', () => {
      const ajvErrors = [
        { keyword: 'required',
          dataPath: '',
          schemaPath: '#/required',
          params: { missingProperty: 'firstName' },
          message: "should have required property 'firstName'"
        }, { keyword: 'required',
          dataPath: '',
          schemaPath: '#/required',
          params: { missingProperty: 'email' },
          message: "should have required property 'email'"
        }
      ]
      const parsedAjvErrors = {
        firstName: 'is required',
        email: 'is required',
      }
      expect(validator.getErrorMessages(ajvErrors)).toEqual(parsedAjvErrors)
    })

    test('getErrorMessage - works with custom keyword', () => {
      const ajvErrors = [
        { keyword: 'isNotEmpty',
          message: 'should NOT be empty',
          params: { keyword: 'isNotEmpty' },
          dataPath: '.lastName',
          schemaPath: '#/properties/lastName/isNotEmpty'
        }
      ]
      const parsedAjvErrors = {
        lastName: 'should NOT be empty',
      }

      expect(validator.getErrorMessages(ajvErrors)).toEqual(parsedAjvErrors)
    })

  })
})
