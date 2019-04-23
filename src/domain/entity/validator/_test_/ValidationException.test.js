import ValidationError from '../ValidationException'

/**
 * The JSONValidator to be tested
 */
describe('ValidationException', () => {

  test('works with message and no details', () => {
    const err = new ValidationError('Validation error')
    expect(err.name).toEqual('Validation exception')
    expect(err.message).toEqual('Validation error')
    expect(err.details).toBeFalsy()
  })

  test('works with message and ajv details', () => {
    const details = {
      firstName: 'is required',
      lastName: 'should NOT be empty',
      email: 'is required',
      phone: 'is required'
    }
    const err = new ValidationError('Validation error', details)
    expect(err.name).toEqual('Validation exception')
    expect(err.message).toEqual('Validation error')
    expect(err.details).toEqual(details)
  })

  test('works with custom message and details', () => {
    const details = {
      firstName: 'should be that',
      email: 'is mandatory'
    }
    const err = new ValidationError('Custom validation message', details)
    expect(err.name).toEqual('Validation exception')
    expect(err.message).toEqual('Custom validation message')
    expect(err.details).toEqual(details)
  })

})
