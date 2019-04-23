import UIModel from '../UIModel'

/**
 * The UIModel to be tested
 */
describe('UIModel', () => {
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    definitions: {
      address: {
        type: 'object',
        properties: {
          city: { type: 'string' },
          state: {
            type: 'string',
            options: [
              { label: 'Alabama', value: 'AL' },
              { label: 'Alaska', value: 'AK' },
              { label: 'Arkansas', value: 'AR' }
            ]
          },
          street: { type: 'string' }
        },
        required: ['street', 'city', 'state']
      },
      personalData: {
        type: 'object',
        properties: {
          firstName: { $ref: '#/definitions/firstName' },
          lastName: { $ref: '#/definitions/firstName' }
        },
        required: ['lastName']
      },
      firstName: { type: 'string', default: 'John' },
      lastName: { type: 'string' }
    },
    type: 'object',
    properties: {
      age: { type: 'integer', default: 24 },
      billingAddress: { $ref: '#/definitions/address' },
      dateOfBirth: {
        type: 'string',
        format: 'date-time'
      },
      dateOfBirthTuple: {
        type: 'array',
        items: [{ type: 'integer' }, { type: 'string' }, { type: 'integer' }]
      },
      email: {
        type: 'object',
        properties: {
          work: { type: 'string' },
          other: { type: 'string' }
        },
        required: ['work']
      },
      friends: {
        type: 'array',
        items: {
          $ref: '#/definitions/personalData'
        }
      },
      hasAJob: { type: 'boolean' },
      invalid: { type: 'null' },
      personalData: { $ref: '#/definitions/personalData' },
      salary: {
        type: 'number',
        options: {
          low: 6000,
          medium: 12000,
          height: 18000
        }
      },
      shippingAddress: {
        allOf: [
          { $ref: '#/definitions/address' },
          {
            properties: {
              type: { enum: ['residential', 'business'] }
            },
            required: ['type']
          }
        ]
      }
    },
    required: ['dateOfBirth']
  }

  const options = {
    allErrors: true,
    useDefaults: true,
    removeAdditional: true
  }

  const uiModel = new UIModel(schema, options)

  /**
   * getError method
   */
  describe('#getError', () => {
    it('works without error object', () => {
      expect(uiModel.getError('firstName')).not.toBeTruthy()
    })

    it('works with invalid error object', () => {
      expect(uiModel.getError('firstName', {})).not.toBeTruthy()
      expect(uiModel.getError('firstName', { invalid: true })).not.toBeTruthy()
    })

    it('works with correct error object', () => {
      expect(uiModel.getError('firstName', { details: [{ dataPath: '.firstName' }] })).toEqual({
        dataPath: '.firstName'
      })
      expect(uiModel.getError('lastName', { details: [{ dataPath: '.field' }] })).not.toBeTruthy()
    })
  })

  /**
   * getErrorMessage method
   */
  describe('#getErrorMessage', () => {
    it('works without error object', () => {
      expect(uiModel.getErrorMessage('phone')).not.toBeTruthy()
    })

    it('works with invalid error object', () => {
      expect(uiModel.getErrorMessage('phone', {})).not.toBeTruthy()
      expect(uiModel.getErrorMessage('phone', { invalid: true })).not.toBeTruthy()
    })

    it('works with correct error object', () => {
      expect(
        uiModel.getErrorMessage('email', {
          details: [
            {
              dataPath: '.email',
              message: 'Zing!'
            }
          ]
        })
      ).toBe('Zing!')

      expect(
        uiModel.getErrorMessage('firstName', {
          details: [
            {
              dataPath: '.field',
              message: 'Ignore!'
            }
          ]
        })
      ).not.toBeTruthy()
    })
  })

  /**
   * getErrorMessages method
   */
  describe('#getErrorMessages', () => {
    it('works without error object', () => {
      expect(uiModel.getErrorMessages()).toEqual([])
    })

    it('works with other errors', () => {
      expect(uiModel.getErrorMessages('correct')).toEqual(['correct'])
      expect(uiModel.getErrorMessages(999999999)).toEqual([999999999])
    })

    it('works with Error', () => {
      expect(uiModel.getErrorMessages(new Error('correct'))).toEqual(['correct'])
    })

    it('works with ValidationExceptionError', () => {
      expect(
        uiModel.getErrorMessages({
          details: [
            {
              dataPath: '.age',
              message: 'Zing!'
            }
          ]
        })
      ).toEqual(['Zing!'])

      expect(
        uiModel.getErrorMessages({
          details: [
            {
              dataPath: '.field',
              message: 'Ignore!'
            }
          ]
        })
      ).toEqual(['Ignore!'])
    })
  })

  /**
   * getField method
   */
  describe('#getField', () => {
    it('returns correct definition (flat)', () => {
      expect(uiModel.getField('age')).toEqual({ type: 'integer', default: 24 })
    })

    it('returns correct definition (flat with $ref)', () => {
      expect(uiModel.getField('billingAddress')).toEqual({
        properties: expect.objectContaining({
          city: { type: 'string' },
          state: {
            type: 'string',
            options: [
              { label: 'Alabama', value: 'AL' },
              { label: 'Alaska', value: 'AK' },
              { label: 'Arkansas', value: 'AR' }
            ]
          },
          street: { type: 'string' }
        }),
        required: ['street', 'city', 'state'],
        type: 'object'
      })
    })

    it('returns correct definition (nested)', () => {
      expect(uiModel.getField('email.work')).toEqual({ type: 'string' })
    })

    it('returns correct definition (nested with $ref)', () => {
      expect(uiModel.getField('personalData.firstName')).toEqual({
        default: 'John',
        type: 'string'
      })
    })

    it('returns correct definition (array tuple)', () => {
      expect(uiModel.getField('dateOfBirthTuple.1')).toEqual({ type: 'string' })
    })

    it('returns correct definition (array flat $ref)', () => {
      expect(uiModel.getField('friends.$')).toEqual(
        expect.objectContaining({ type: expect.any(String) })
      )
    })

    it('returns correct definition (array flat $ref, nested property)', () => {
      expect(uiModel.getField('friends.$.firstName')).toEqual({ default: 'John', type: 'string' })
    })
  })

  /**
   * getInitialValue method
   */
  describe('#getInitialValue', () => {
    it('works with arrays', () => {
      expect(uiModel.getInitialValue('friends')).toEqual([])
      expect(uiModel.getInitialValue('friends', { initialCount: 1 })).toEqual([{}])
      expect(uiModel.getInitialValue('friends.0.firstName', { initialCount: 1 })).toBe('John')
    })

    it('works with objects', () => {
      expect(uiModel.getInitialValue('billingAddress')).toEqual({})
    })

    it('works with undefined primitives', () => {
      expect(uiModel.getInitialValue('salary')).toBe(undefined)
    })

    it('works with defined primitives', () => {
      expect(uiModel.getInitialValue('age')).toBe(24)
    })

    it('works with default values', () => {
      expect(uiModel.getInitialValue('personalData.firstName')).toBe('John')
    })
  })

  describe('#getProps', () => {
    it('works with allowedValues', () => {
      expect(uiModel.getProps('shippingAddress.type')).toEqual({
        allowedValues: ['residential', 'business'],
        label: 'Type',
        required: true
      })
    })

    it('works with allowedValues from props', () => {
      expect(uiModel.getProps('shippingAddress.type', { allowedValues: [1] })).toEqual({
        allowedValues: [1],
        label: 'Type',
        required: true
      })
    })

    it('works with label (custom)', () => {
      expect(uiModel.getProps('dateOfBirth', { label: 'Date of death' })).toEqual({
        label: 'Date of death',
        required: true
      })
    })

    it('works with label (true)', () => {
      expect(uiModel.getProps('dateOfBirth', { label: true })).toEqual({
        label: 'Date of birth',
        required: true
      })
    })

    it('works with label (falsy)', () => {
      expect(uiModel.getProps('dateOfBirth', { label: null })).toEqual({
        label: '',
        required: true
      })
    })

    it('works with placeholder (custom)', () => {
      expect(uiModel.getProps('email.work', { placeholder: 'Work email' })).toEqual({
        allowedValues: undefined,
        label: 'Work',
        options: undefined,
        placeholder: 'Work email',
        required: true
      })
    })

    it('works with placeholder (true)', () => {
      expect(uiModel.getProps('email.work', { placeholder: true })).toEqual({
        allowedValues: undefined,
        label: 'Work',
        options: undefined,
        placeholder: 'Work',
        required: true
      })
    })

    it('works with placeholder (falsy)', () => {
      expect(uiModel.getProps('email.work', { placeholder: null })).toEqual({
        allowedValues: undefined,
        label: 'Work',
        options: undefined,
        placeholder: null,
        required: true
      })
    })

    it('works with placeholder (label falsy)', () => {
      expect(uiModel.getProps('email.work', { label: null, placeholder: true })).toEqual({
        allowedValues: undefined,
        label: '',
        options: undefined,
        placeholder: 'Work',
        required: true
      })

      expect(uiModel.getProps('email.work', { label: false, placeholder: true })).toEqual({
        allowedValues: undefined,
        label: '',
        options: undefined,
        placeholder: 'Work',
        required: true
      })
    })

    it('works with Number type', () => {
      expect(uiModel.getProps('salary')).toEqual({
        allowedValues: ['low', 'medium', 'height'],
        decimal: true,
        label: 'Salary',
        options: expect.anything(),
        required: false,
        transform: expect.anything()
      })
    })

    it('works with options (array)', () => {
      expect(uiModel.getProps('billingAddress.state').transform('AL')).toBe('Alabama')
      expect(uiModel.getProps('billingAddress.state').transform('AK')).toBe('Alaska')
      expect(uiModel.getProps('billingAddress.state').allowedValues[0]).toBe('AL')
      expect(uiModel.getProps('billingAddress.state').allowedValues[1]).toBe('AK')
    })

    it('works with options (object)', () => {
      expect(uiModel.getProps('salary').transform('low')).toBe(6000)
      expect(uiModel.getProps('salary').transform('medium')).toBe(12000)
      expect(uiModel.getProps('salary').allowedValues[0]).toBe('low')
      expect(uiModel.getProps('salary').allowedValues[1]).toBe('medium')
    })

    it('works with options from props', () => {
      const props = { options: { minimal: 4000, avarage: 8000 } }
      expect(uiModel.getProps('salary', props).transform('minimal')).toBe(4000)
      expect(uiModel.getProps('salary', props).transform('avarage')).toBe(8000)
      expect(uiModel.getProps('salary', props).allowedValues[0]).toBe('minimal')
      expect(uiModel.getProps('salary', props).allowedValues[1]).toBe('avarage')
    })

    it('works with other props', () => {
      expect(uiModel.getProps('personalData.firstName', { x: 1, y: 1 })).toEqual({
        label: 'First name',
        required: false,
        x: 1,
        y: 1
      })
    })
  })

  describe('#getSubFields', () => {
    it('works on top level', () => {
      expect(uiModel.getSubFields()).toEqual([
        'age',
        'billingAddress',
        'dateOfBirth',
        'dateOfBirthTuple',
        'email',
        'friends',
        'hasAJob',
        'invalid',
        'personalData',
        'salary',
        'shippingAddress'
      ])
    })

    it('works with nested types', () => {
      expect(uiModel.getSubFields('shippingAddress')).toEqual(['city', 'state', 'street', 'type'])
    })

    it('works with primitives', () => {
      expect(uiModel.getSubFields('personalData.firstName')).toEqual([])
      expect(uiModel.getSubFields('age')).toEqual([])
    })
  })

  describe('#getType', () => {
    it('works with any type', () => {
      expect(uiModel.getType('age')).toBe(Number)
      expect(uiModel.getType('billingAddress')).toBe(Object)
      expect(uiModel.getType('billingAddress.city')).toBe(String)
      expect(uiModel.getType('billingAddress.state')).toBe(String)
      expect(uiModel.getType('billingAddress.street')).toBe(String)
      expect(uiModel.getType('dateOfBirth')).toBe(Date)
      expect(uiModel.getType('dateOfBirthTuple')).toBe(Array)
      expect(uiModel.getType('email')).toBe(Object)
      expect(uiModel.getType('email.work')).toBe(String)
      expect(uiModel.getType('email.other')).toBe(String)
      expect(uiModel.getType('friends')).toBe(Array)
      expect(uiModel.getType('friends.$')).toBe(Object)
      expect(uiModel.getType('friends.$.firstName')).toBe(String)
      expect(uiModel.getType('friends.$.lastName')).toBe(String)
      expect(uiModel.getType('hasAJob')).toBe(Boolean)
      expect(() => uiModel.getType('invalid')).toThrow(/can not be represented as a type null/)
      expect(uiModel.getType('personalData')).toBe(Object)
      expect(uiModel.getType('salary')).toBe(Number)
      expect(uiModel.getType('shippingAddress')).toBe(Object)
    })
  })
})
