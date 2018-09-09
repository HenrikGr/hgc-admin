/**
 * @prettier
 * @description: Profile schema service
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import profileSchema from '../schemas/json/profile'
import Entity from '../schemas/entity/Entity'

// Schema entity based on ajv
const ProfileEntity = new Entity(profileSchema)

/**
 * Get profile schema
 * @returns {object} - profile json schema
 */
function getSchema() {
  return profileSchema
}

/**
 * Get profile default entity
 * @returns {object} - profile default entity
 */
function getEntity() {
  return ProfileEntity.getEntity()
}

/**
 * Validate profile entity
 * @param {object} profile - profile entity
 * @returns {object} - profile entity of no error otherwise entity validation exception
 */
function validate(profile) {
  return ProfileEntity.isValid(profile)
}

/**
 * Export interface for the profile schema service
 * @constructor
 */
function ProfileSchemaFactory() {
  return {
    getSchema,
    getEntity,
    validate,
  }
}

// Export interface
export default new ProfileSchemaFactory()