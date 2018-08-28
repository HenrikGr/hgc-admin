
import EntityModel from '../entity/EntityModel';
import profileSchema from '../../schemas/json/profile';

/**
 * The JSONSchema to be tested
 */
describe('EntityModel', () => {
  const schema = profileSchema;
  const options = {
    allErrors: true,
    useDefaults: true,
    removeAdditional: true
  };

  const bridge = new EntityModel(schema, options);

  describe('#getError', () => {
    it('works without error object', () => {
      expect(bridge.getError('firstName')).not.toBeTruthy();
    });

    it('works with invalid error object', () => {
      expect(bridge.getError('firstName', {})).not.toBeTruthy();
      expect(bridge.getError('firstName', {invalid: true})).not.toBeTruthy();
    });

    it('works with correct error object', () => {
      expect(bridge.getError('firstName', {details: [{dataPath: '.firstName'}]}))
        .toEqual({dataPath: '.firstName'});
      expect(bridge.getError('lastName', {details: [{dataPath: '.field'}]})).not.toBeTruthy();
    });
  });

  describe('#getErrorMessage', () => {
    it('works without error object', () => {
      expect(bridge.getErrorMessage('phone')).not.toBeTruthy();
    });

    it('works with invalid error object', () => {
      expect(bridge.getErrorMessage('phone', {})).not.toBeTruthy();
      expect(bridge.getErrorMessage('phone', {invalid: true})).not.toBeTruthy();
    });

    it('works with correct error object', () => {
      expect(bridge.getErrorMessage('email', {
        details: [{
          dataPath: '.email',
          message: 'Zing!'
        }]
      })).toBe('Zing!');

      expect(bridge.getErrorMessage('firstName', {
        details: [{
          dataPath: '.field',
          message: 'Ignore!'
        }]})).not.toBeTruthy();
    });
  });

  describe('#getErrorMessages', () => {
    it('works without error object', () => {
      expect(bridge.getErrorMessages()).toEqual([]);
    });

    it('works with other errors', () => {
      expect(bridge.getErrorMessages('correct')).toEqual(['correct']);
      expect(bridge.getErrorMessages(999999999)).toEqual([999999999]);
    });

    it('works with Error', () => {
      expect(bridge.getErrorMessages(new Error('correct'))).toEqual(['correct']);
    });

    it('works with ValidationExceptionError', () => {
      expect(bridge.getErrorMessages({
        details: [{
          dataPath: '.age',
          message: 'Zing!'
        }]})).toEqual(['Zing!']);

      expect(bridge.getErrorMessages({
        details: [{
          dataPath: '.field',
          message: 'Ignore!'
        }]})).toEqual(['Ignore!']);
    });
  });

});