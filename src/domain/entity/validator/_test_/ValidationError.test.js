import ValidationError from '../ValidationError'

describe('ValidationException', () => {

  it('throws invariant error with no arguments', () => {
    expect(() => {
      const err = new ValidationError()
    }).toThrowError(Error)
  })

  test('works with message arguments only', () => {
    const err = new ValidationError('Message')

    expect(err.name).toEqual('ValidationException')
    expect(err.message).toEqual('Message')
    expect(err.details).toBeUndefined()
  })

  test('works with message and details arguments, (multiple key value pairs as details)', () => {
    const details = {
      firstName: 'is required',
      lastName: 'should NOT be empty',
      email: 'is required',
      phone: 'is required'
    }
    const err = new ValidationError('Messages', details)

    expect(err.name).toEqual('ValidationException')
    expect(err.message).toEqual('Messages')
    expect(err.details).toStrictEqual(details)
  })

  test('works with message and details argument, (single key value pair as details)', () => {
    const details = {
      firstName: 'should be that'
    }
    const err = new ValidationError('Message', details)

    expect(err.name).toEqual('ValidationException')
    expect(err.message).toEqual('Message')
    expect(err.details).toStrictEqual(details)
  })
})
