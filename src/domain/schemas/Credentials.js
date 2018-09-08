/**
 * @prettier
 * @description: Credentials schema services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import credentialSchema from './json/credentials'
import Entity from './entity/Entity'

// Schema entity based on ajv
const CredentialsEntity = new Entity(credentialSchema)

/**
 * Get credentials schema
 * @returns {object} - credentials json schema
 */
function getSchema() {
  return credentialSchema
}

/**
 * Get credentials default entity
 * @returns {object} - credentials default entity
 */
function getEntity() {
  return CredentialsEntity.getEntity()
}

/**
 * Validate credentials entity
 * @param {object} credentials - credentials entity
 * @returns {object} - credentials entity of no error otherwise entity validation exception
 */
function validate(credentials) {
  return CredentialsEntity.isValid(credentials)
}

/**
 * Factory for credentials schema service interface
 * @constructor
 */
function CredentialsSchemaFactory() {
  return {
    getSchema,
    getEntity,
    validate,
  }
}

// Export a new instance exposing the interface
export default new CredentialsSchemaFactory()
