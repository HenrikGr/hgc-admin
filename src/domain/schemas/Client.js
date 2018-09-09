/**
 * @prettier
 * @description: Client schema services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import clientSchema from '../schemas/json/client'
import Entity from '../schemas/entity/Entity'

// Schema entity based on ajv
const ClientEntity = new Entity(clientSchema)

/**
 * Get client schema
 * @returns {object} - client json schema
 */
function getSchema() {
  return clientSchema
}

/**
 * Get client default entity
 * @returns {object} - client default entity
 */
function getEntity() {
  return ClientEntity.getEntity()
}

/**
 * Validate a client object
 * @param {object} client - profile entity
 * @returns {object} - client entity of no error otherwise entity validation exception
 */
function validate(client) {
  return ClientEntity.isValid(client)
}

/**
 * Export interface for the client schema service
 * @constructor
 */
function ClientSchemaServiceFactory() {
  return {
    getSchema,
    getEntity,
    validate
  }
}

// Export interface
export default new ClientSchemaServiceFactory()