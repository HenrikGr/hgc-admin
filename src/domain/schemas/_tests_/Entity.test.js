
import Entity from '../../ui-service/Entity';
import profileSchema from '../json/profile';

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

  const ProfileEntity = new Entity(schema, options);

  describe('#getError', () => {
    it('works without error object', () => {
      expect(ProfileEntity.getError('firstName')).not.toBeTruthy();
    });

    it('works with invalid error object', () => {
      expect(ProfileEntity.getError('firstName', {})).not.toBeTruthy();
      expect(ProfileEntity.getError('firstName', {invalid: true})).not.toBeTruthy();
    });

    it('works with correct error object', () => {
      expect(ProfileEntity.getError('firstName', {details: [{dataPath: '.firstName'}]}))
        .toEqual({dataPath: '.firstName'});
      expect(ProfileEntity.getError('lastName', {details: [{dataPath: '.field'}]})).not.toBeTruthy();
    });
  });

  describe('#getErrorMessage', () => {
    it('works without error object', () => {
      expect(ProfileEntity.getErrorMessage('phone')).not.toBeTruthy();
    });

    it('works with invalid error object', () => {
      expect(ProfileEntity.getErrorMessage('phone', {})).not.toBeTruthy();
      expect(ProfileEntity.getErrorMessage('phone', {invalid: true})).not.toBeTruthy();
    });

    it('works with correct error object', () => {
      expect(ProfileEntity.getErrorMessage('email', {
        details: [{
          dataPath: '.email',
          message: 'Zing!'
        }]
      })).toBe('Zing!');

      expect(ProfileEntity.getErrorMessage('firstName', {
        details: [{
          dataPath: '.field',
          message: 'Ignore!'
        }]})).not.toBeTruthy();
    });
  });

  describe('#getErrorMessages', () => {
    it('works without error object', () => {
      expect(ProfileEntity.getErrorMessages()).toEqual([]);
    });

    it('works with other errors', () => {
      expect(ProfileEntity.getErrorMessages('correct')).toEqual(['correct']);
      expect(ProfileEntity.getErrorMessages(999999999)).toEqual([999999999]);
    });

    it('works with Error', () => {
      expect(ProfileEntity.getErrorMessages(new Error('correct'))).toEqual(['correct']);
    });

    it('works with ValidationExceptionError', () => {
      expect(ProfileEntity.getErrorMessages({
        details: [{
          dataPath: '.age',
          message: 'Zing!'
        }]})).toEqual(['Zing!']);

      expect(ProfileEntity.getErrorMessages({
        details: [{
          dataPath: '.field',
          message: 'Ignore!'
        }]})).toEqual(['Ignore!']);
    });
  });

});