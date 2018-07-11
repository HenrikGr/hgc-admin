

import JSONSchema from '../JSONSchema';

/**
 * The JSONSchema to be tested
 */
describe('JSONSchema', () => {
  const schema = {
    $schema: 'http://json-schema.org/draft-06/schema#',
    definitions: {
      address: {
        type: 'object',
        properties: {
          city:   {type: 'string'},
          state:  {
            type: 'string',
            options: [
              {label: 'Alabama',  value: 'AL'},
              {label: 'Alaska',   value: 'AK'},
              {label: 'Arkansas', value: 'AR'}
            ]
          },
          street: {type: 'string'}
        },
        required: ['street', 'city', 'state']
      },
      personalData: {
        type: 'object',
        properties: {
          firstName: {$ref: '#/definitions/firstName'},
          lastName:  {$ref: '#/definitions/firstName'}
        },
        required: ['lastName']
      },
      firstName: {type: 'string', default: 'John'},
      lastName: {type: 'string'}
    },
    type: 'object',
    properties: {
      age: {type: 'integer', uniforms: {component: 'span'}, default: 24},
      billingAddress: {$ref: '#/definitions/address'},
      custom: {type: 'custom'},
      dateOfBirth: {
        type: 'string',
        format: 'date-time'
      },
      dateOfBirthTuple: {
        type: 'array',
        items: [{type: 'integer'}, {type: 'string'}, {type: 'integer'}]
      },
      email: {
        type: 'object',
        properties: {
          work:   {type: 'string'},
          other:  {type: 'string'}
        },
        required: ['work']
      },
      friends: {
        type: 'array',
        items: {
          $ref: '#/definitions/personalData'
        }
      },
      hasAJob: {type: 'boolean'},
      invalid: {type: 'null'},
      personalData: {$ref: '#/definitions/personalData'},
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
          {$ref: '#/definitions/address'},
          {
            properties: {
              type: {enum: ['residential', 'business']}
            },
            required: ['type']
          }
        ]
      }
    },
    required: ['dateOfBirth']
  };

  const validator = jest.fn();
  const bridge = new JSONSchema(schema, validator);

  describe('#getErrorByName', () => {
    it('works without error', () => {
      expect(bridge.getErrorByName('age')).not.toBeTruthy();
    });

    it('works with invalid error', () => {
      expect(bridge.getErrorByName('age', {})).not.toBeTruthy();
      expect(bridge.getErrorByName('age', {invalid: true})).not.toBeTruthy();
    });

    it('works with correct error', () => {
      expect(bridge.getErrorByName('age', {details: [{dataPath: '.age'}]})).toEqual({dataPath: '.age'});
      expect(bridge.getErrorByName('age', {details: [{dataPath: '.field'}]})).not.toBeTruthy();
    });
  });

  describe('#getErrorMessageByName', () => {
    it('works without error', () => {
      expect(bridge.getErrorMessageByName('age')).not.toBeTruthy();
    });

    it('works with invalid error', () => {
      expect(bridge.getErrorMessageByName('age', {})).not.toBeTruthy();
      expect(bridge.getErrorMessageByName('age', {invalid: true})).not.toBeTruthy();
    });

    it('works with correct error', () => {
      expect(bridge.getErrorMessageByName('age', {details: [{dataPath: '.age', message: 'Zing!'}]})).toBe('Zing!');
      expect(bridge.getErrorMessageByName('age', {details: [{dataPath: '.field', message: 'Ignore!'}]})).not.toBeTruthy();
    });
  });

  describe('#getErrorMessages', () => {
    it('works without error', () => {
      expect(bridge.getErrorMessages()).toEqual([]);
    });

    it('works with other errors', () => {
      expect(bridge.getErrorMessages('correct')).toEqual(['correct']);
      expect(bridge.getErrorMessages(999999999)).toEqual([999999999]);
    });

    it('works with Error', () => {
      expect(bridge.getErrorMessages(new Error('correct'))).toEqual(['correct']);
    });

    it('works with ValidationError', () => {
      expect(bridge.getErrorMessages({details: [{dataPath: '.age', message: 'Zing!'}]})).toEqual(['Zing!']);
      expect(bridge.getErrorMessages({details: [{dataPath: '.field', message: 'Ignore!'}]})).toEqual(['Ignore!']);
    });
  });

  describe('#getFieldByName', () => {
    it('returns correct definition (flat)', () => {
      expect(bridge.getFieldByName('age')).toEqual({type: 'integer', default: 24, uniforms: {component: 'span'}});
    });

    it('returns correct definition (flat with $ref)', () => {
      expect(bridge.getFieldByName('billingAddress')).toEqual({
        properties: expect.objectContaining({
          city: {type: 'string'},
          state: {
            type: 'string',
            options: [
              {label: 'Alabama', value: 'AL'},
              {label: 'Alaska', value: 'AK'},
              {label: 'Arkansas', value: 'AR'}
            ]
          },
          street: {type: 'string'}
        }),
        required: ['street', 'city', 'state'],
        type: 'object'
      });
    });


    it('returns correct definition (nested)', () => {
      expect(bridge.getFieldByName('email.work')).toEqual({type: 'string'});
    });

    it('returns correct definition (nested with $ref)', () => {
      expect(bridge.getFieldByName('personalData.firstName')).toEqual({default: 'John', type: 'string'});
    });

    it('returns correct definition (array tuple)', () => {
      expect(bridge.getFieldByName('dateOfBirthTuple.1')).toEqual({type: 'string'});
    });

    it('returns correct definition (array flat $ref)', () => {
      expect(bridge.getFieldByName('friends.$')).toEqual(expect.objectContaining({type: expect.any(String)}));
    });

    it('returns correct definition (array flat $ref, nested property)', () => {
      expect(bridge.getFieldByName('friends.$.firstName')).toEqual({default: 'John', type: 'string'});
    });
  });

  describe('#getInitialValue', () => {
    it('works with arrays', () => {
      expect(bridge.getInitialValueByName('friends')).toEqual([]);
      expect(bridge.getInitialValueByName('friends', {initialCount: 1})).toEqual([{}]);
      expect(bridge.getInitialValueByName('friends.0.firstName', {initialCount: 1})).toBe('John');
    });

    it('works with objects', () => {
      expect(bridge.getInitialValueByName('billingAddress')).toEqual({});
    });

    it('works with undefined primitives', () => {
      expect(bridge.getInitialValueByName('salary')).toBe(undefined);
    });

    it('works with defined primitives', () => {
      expect(bridge.getInitialValueByName('age')).toBe(24);
    });

    it('works with default values', () => {
      expect(bridge.getInitialValueByName('personalData.firstName')).toBe('John');
    });
  });

  describe('#getPropsByName', () => {
    it('works with allowedValues', () => {
      expect(bridge.getPropsByName('shippingAddress.type')).toEqual({
        allowedValues: ['residential', 'business'],
        label: 'Type',
        required: true
      });
    });

    it('works with allowedValues from props', () => {
      expect(bridge.getPropsByName('shippingAddress.type', {allowedValues: [1]})).toEqual({
        allowedValues: [1],
        label: 'Type',
        required: true
      });
    });

    it('works with custom component', () => {
      expect(bridge.getPropsByName('age')).toEqual({
        component: 'span',
        label: 'Age',
        required: false
      });
    });

    it('works with label (custom)', () => {
      expect(bridge.getPropsByName('dateOfBirth', {label: 'Date of death'})).toEqual({
        label: 'Date of death',
        required: true
      });
    });

    it('works with label (true)', () => {
      expect(bridge.getPropsByName('dateOfBirth', {label: true})).toEqual({
        label: 'Date of birth',
        required: true
      });
    });

    it('works with label (falsy)', () => {
      expect(bridge.getPropsByName('dateOfBirth', {label: null})).toEqual({
        label: '',
        required: true
      });
    });

    it('works with placeholder (custom)', () => {
      expect(bridge.getPropsByName('email.work', {placeholder: 'Work email'})).toEqual({
        allowedValues: undefined,
        label: 'Work',
        options: undefined,
        placeholder: 'Work email',
        required: true
      });
    });

    it('works with placeholder (true)', () => {
      expect(bridge.getPropsByName('email.work', {placeholder: true})).toEqual({
        allowedValues: undefined,
        label: 'Work',
        options: undefined,
        placeholder: 'Work',
        required: true
      });
    });

    it('works with placeholder (falsy)', () => {
      expect(bridge.getPropsByName('email.work', {placeholder: null})).toEqual({
        allowedValues: undefined,
        label: 'Work',
        options: undefined,
        placeholder: null,
        required: true
      });
    });

    it('works with placeholder (label falsy)', () => {
      expect(bridge.getPropsByName('email.work', {label: null, placeholder: true})).toEqual({
        allowedValues: undefined,
        label: '',
        options: undefined,
        placeholder: 'Work',
        required: true
      });

      expect(bridge.getPropsByName('email.work', {label: false, placeholder: true})).toEqual({
        allowedValues: undefined,
        label: '',
        options: undefined,
        placeholder: 'Work',
        required: true
      });
    });

    it('works with Number type', () => {
      expect(bridge.getPropsByName('salary')).toEqual({
        allowedValues: ['low', 'medium', 'height'],
        decimal: true,
        label: 'Salary',
        options: expect.anything(),
        required: false,
        transform: expect.anything()
      });
    });

    it('works with options (array)', () => {
      expect(bridge.getPropsByName('billingAddress.state').transform('AL')).toBe('Alabama');
      expect(bridge.getPropsByName('billingAddress.state').transform('AK')).toBe('Alaska');
      expect(bridge.getPropsByName('billingAddress.state').allowedValues[0]).toBe('AL');
      expect(bridge.getPropsByName('billingAddress.state').allowedValues[1]).toBe('AK');
    });

    it('works with options (object)', () => {
      expect(bridge.getPropsByName('salary').transform('low')).toBe(6000);
      expect(bridge.getPropsByName('salary').transform('medium')).toBe(12000);
      expect(bridge.getPropsByName('salary').allowedValues[0]).toBe('low');
      expect(bridge.getPropsByName('salary').allowedValues[1]).toBe('medium');
    });

    it('works with options from props', () => {
      const props = {options: {minimal: 4000, avarage: 8000}};
      expect(bridge.getPropsByName('salary', props).transform('minimal')).toBe(4000);
      expect(bridge.getPropsByName('salary', props).transform('avarage')).toBe(8000);
      expect(bridge.getPropsByName('salary', props).allowedValues[0]).toBe('minimal');
      expect(bridge.getPropsByName('salary', props).allowedValues[1]).toBe('avarage');
    });

    it('works with other props', () => {
      expect(bridge.getPropsByName('personalData.firstName', {x: 1, y: 1})).toEqual({
        label: 'First name',
        required: false,
        x: 1,
        y: 1
      });
    });
  });

  describe('#getSubFieldsByName', () => {
    it('works on top level', () => {
      expect(bridge.getSubFieldsByName()).toEqual([
        'age',
        'billingAddress',
        'custom',
        'dateOfBirth',
        'dateOfBirthTuple',
        'email',
        'friends',
        'hasAJob',
        'invalid',
        'personalData',
        'salary',
        'shippingAddress'
      ]);
    });

    it('works with nested types', () => {
      expect(bridge.getSubFieldsByName('shippingAddress')).toEqual(['city', 'state', 'street', 'type']);
    });

    it('works with primitives', () => {
      expect(bridge.getSubFieldsByName('personalData.firstName')).toEqual([]);
      expect(bridge.getSubFieldsByName('age')).toEqual([]);
    });
  });

  describe('#getType', () => {
    it('works with any type', () => {
      expect(bridge.getTypeByName('age')).toBe(Number);
      expect(bridge.getTypeByName('billingAddress')).toBe(Object);
      expect(bridge.getTypeByName('billingAddress.city')).toBe(String);
      expect(bridge.getTypeByName('billingAddress.state')).toBe(String);
      expect(bridge.getTypeByName('billingAddress.street')).toBe(String);
      expect(bridge.getTypeByName('custom')).toBe('custom');
      expect(bridge.getTypeByName('dateOfBirth')).toBe(Date);
      expect(bridge.getTypeByName('dateOfBirthTuple')).toBe(Array);
      expect(bridge.getTypeByName('email')).toBe(Object);
      expect(bridge.getTypeByName('email.work')).toBe(String);
      expect(bridge.getTypeByName('email.other')).toBe(String);
      expect(bridge.getTypeByName('friends')).toBe(Array);
      expect(bridge.getTypeByName('friends.$')).toBe(Object);
      expect(bridge.getTypeByName('friends.$.firstName')).toBe(String);
      expect(bridge.getTypeByName('friends.$.lastName')).toBe(String);
      expect(bridge.getTypeByName('hasAJob')).toBe(Boolean);
      expect(() => bridge.getTypeByName('invalid')).toThrow(/can not be represented as a type null/);
      expect(bridge.getTypeByName('personalData')).toBe(Object);
      expect(bridge.getTypeByName('salary')).toBe(Number);
      expect(bridge.getTypeByName('shippingAddress')).toBe(Object);
    });
  });

  describe('#getValidator', () => {
    it('calls correct validator', () => {
      expect(bridge.getValidator()).toBe(validator);
    });
  });
});