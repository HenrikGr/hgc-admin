/**
 * @prettier
 * @description: Profile schema services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import userSchema from '../schemas/json/user'
import Entity from '../schemas/entity/Entity'

// Schema entity based on ajv
const UserEntity = new Entity(userSchema);

/**
 * Get user schema
 * @returns {object} - user json schema
 */
function getSchema() {
  return userSchema;
}

/**
 * Get user default entity
 * @returns {object} - user default entity
 */
function getEntity() {
  return UserEntity.getEntity();
}

/**
 * Validate a user object
 * @param {object} user - profile entity
 * @returns {object} - user entity of no error otherwise entity validation exception
 */
function validate(user) {
  return UserEntity.isValid(user);
}

/**
 * Export interface for the user schema service
 * @constructor
 */
function UserSchemaFactory () {
  return {
    getSchema,
    getEntity,
    validate,
  };
}

// Export interface
export default new UserSchemaFactory();
