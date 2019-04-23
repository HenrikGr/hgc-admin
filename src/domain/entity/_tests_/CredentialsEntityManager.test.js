import CredentialsEntity from '../CredentialsEntity'
import ValidationError from '../validator/ValidationException'

/**
 * CredentialsEntity entity class
 */
describe('CredentialsEntity entity class', () => {
  describe('#Instance', () => {
    test('works with correct arguments', () => {
      let userCred = new CredentialsEntity('henrik', 'Kjc9023DC')
      expect(userCred).toBeInstanceOf(CredentialsEntity)
      expect(userCred).toHaveProperty('_credentials')
      expect(userCred).toHaveProperty('_validator')
    })

    test('works with correct arguments (empty)', () => {
      let userCred = new CredentialsEntity('', '')
      expect(userCred).toBeInstanceOf(CredentialsEntity)
      expect(userCred).toHaveProperty('_credentials')
      expect(userCred).toHaveProperty('_validator')
    })


    test('works with incorrect arguments (missing)', () => {
      let thrownError
      try {
        new CredentialsEntity()
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toBeInstanceOf(Error)
      expect(thrownError.name).toEqual('Invariant Violation')
      expect(thrownError.message).toEqual('CredentialsEntity - constructor must have valid arguments')
    })
  })

  describe('#Validation', () => {
    test('works with correct schema credentials', () => {
      let userCred = new CredentialsEntity('henrik', 'Kjc9023DC')
      expect(userCred.isValid()).toBeTruthy()
      expect(userCred.isValid()).toEqual({
        username: 'henrik',
        password: 'Kjc9023DC',
        client_id: '8288e4303e9ac82aa3daf25c72151230',
        grant_type: 'password'
      })
    })

    test('works with incorrect schema credentials', () => {
      let inValidCred = new CredentialsEntity('hen', 'KjcDC')
      let thrownError
      let details = {
        username: 'should NOT be shorter than 4 characters',
        password:
          'password must be 6 to 20 characters and at least one numeric, one uppercase and one lowercase'
      }

      try {
        inValidCred.isValid()
      } catch (error) {
        thrownError = error
      }
      expect(thrownError).toBeInstanceOf(ValidationError)
      expect(thrownError.name).toEqual('Validation exception')
      expect(thrownError.message).toEqual('Validation error')
      expect(thrownError.details).toEqual(details)
    })
  })
})
