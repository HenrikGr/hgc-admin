import ValidationError from '../ValidationError'
import JSONValidator from '../JSONValidator'
import schema from '../../schemas/mock'

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

  describe('#with profile schema (mocked)', () => {
    test('works without error object', () => {
      expect(validator.getErrorMessages()).toEqual([])
    })

    test('works with other errors', () => {
      expect(validator.getErrorMessages('correct')).toEqual(['correct'])
      expect(validator.getErrorMessages(999999999)).toEqual([999999999])
    })

    test('works with Error', () => {
      expect(validator.getErrorMessages(new Error('correct'))).toEqual(['correct'])
    })

    test('works with ValidationError', () => {
      expect(validator.getErrorMessages(new ValidationError('correct'))).toEqual(['correct'])
    })

    test('works with ajv error specification', () => {
      const ajvErrors = [
        {
          keyword: 'required',
          dataPath: '',
          schemaPath: '#/required',
          params: { missingProperty: 'firstName' },
          message: "should have required property 'firstName'"
        },
        {
          keyword: 'isNotEmpty',
          message: 'should NOT be empty',
          params: { keyword: 'isNotEmpty' },
          dataPath: '.lastName',
          schemaPath: '#/properties/lastName/isNotEmpty'
        },
        {
          keyword: 'required',
          dataPath: '',
          schemaPath: '#/required',
          params: { missingProperty: 'email' },
          message: "should have required property 'email'"
        },
        {
          keyword: 'required',
          dataPath: '',
          schemaPath: '#/required',
          params: { missingProperty: 'phone' },
          message: "should have required property 'phone'"
        }
      ]
      const parsedAjvErrors = {
        firstName: 'is required',
        lastName: 'should NOT be empty',
        email: 'is required',
        phone: 'is required'
      }

      expect(validator.getErrorMessages(ajvErrors)).toEqual(parsedAjvErrors)
    })
  })
})
