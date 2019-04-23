import UIModel from '../UIModel'
import profileSchema from '../../entity/schemas/profile'
import ValidationError from '../../entity/validator/ValidationException'

/**
 * The JSONValidator to be tested
 */
describe('UIModel with profile schema', () => {
  const schema = profileSchema
  const options = {
    allErrors: true,
    useDefaults: false,
    removeAdditional: true
  }

  const ProfileModel = new UIModel(schema, options)
  const ajvErrors = [ { keyword: 'required',
    dataPath: '',
    schemaPath: '#/required',
    params: { missingProperty: 'firstName' },
    message: 'should have required property \'firstName\'' },
    { keyword: 'isNotEmpty',
      message: 'should NOT be empty',
      params: { keyword: 'isNotEmpty' },
      dataPath: '.lastName',
      schemaPath: '#/properties/lastName/isNotEmpty' },
    { keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: { missingProperty: 'email' },
      message: 'should have required property \'email\'' },
    { keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: { missingProperty: 'phone' },
      message: 'should have required property \'phone\'' } ]

  const validationErrors = new ValidationError('Validation error ', ProfileModel.getErrorMessages(ajvErrors))
  console.log('validation errors', validationErrors)
  /**
   * getErrorMessages
   */
  describe('#getErrorMessages', () => {
    it('works without error object', () => {
      expect(ProfileModel.getErrorMessages()).toEqual([])
    })

    test('works with other errors', () => {
      expect(ProfileModel.getErrorMessages('correct')).toEqual(['correct'])
      expect(ProfileModel.getErrorMessages(999999999)).toEqual([999999999])
    })

    test('works with Error', () => {
      expect(ProfileModel.getErrorMessages(new Error('correct'))).toEqual(['correct'])
    })

    test('works with ValidationError', () => {
      expect(ProfileModel.getErrorMessages(new ValidationError('correct'))).toEqual(['correct'])
    })

    test('works with ValidationError - missingProperty (required)', () => {
      expect(ProfileModel.getErrorMessages([
        { keyword: 'required',
          dataPath: '',
          params: { missingProperty: 'email' },
          message: "is required"
        }
      ])).toEqual({
        email: "is required"
      })
    })

    test('works with ValidationError - dataPath (custom Keyword)', () => {
      expect(ProfileModel.getErrorMessages([
        { keyword: 'isNotEmpty',
          dataPath: '.firstName',
          message: 'should NOT be empty'
        }])).toEqual({firstName: 'should NOT be empty'})
    })

    test('works with ValidationError - additionalProperties (wrong name of field)', () => {
      expect(ProfileModel.getErrorMessages([
        { keyword: 'additionalProperties',
          dataPath: '',
          params: { additionalProperty: 'firstNames' },
          message: 'should NOT have additional properties'
        }])).toEqual({firstNames: 'should NOT have additional properties'})
    })

  })

  /**
   * Validation test-plugins
   */
  describe('#Validation of profile data', () => {
    let ProfileData = {
      firstName: 'Henrik',
      lastName: 'Grönvall',
      email: 'hgc-ab@outlook.com',
      phone: +46702579834
    }
    let emptyProfile = {
      firstNames: '',
      lastName: ''
    }

    test('works with correct data services', () => {
      expect(ProfileModel.isValid(ProfileData)).toEqual(ProfileData)
    })

    test('works with throwing validation error', () => {
      function validateProfile() {
        ProfileModel.isValid(emptyProfile)
      }
      expect(validateProfile).toThrowError(ValidationError)
    })
  })
})
