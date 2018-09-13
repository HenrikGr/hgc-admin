/**
 * @prettier
 * @description: Token schema services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import tokenSchema from '../schemas/json/token'
import Entity from '../schemas/entity/Entity'

// Schema entity based on ajv
const TokenEntity = new Entity(tokenSchema)

/**
 * Get token schema
 * @returns {object} - credentials json schema
 * @public
 */
function getSchema() {
  return tokenSchema
}

/**
 * Get token default entity
 * @returns {object} - credentials default entity
 * @public
 */
function getEntity() {
  return TokenEntity.getEntity()
}

/**
 * Validate token entity
 * @param {object} token - token entity
 * @returns {object} - token entity of no error otherwise entity validation exception
 */
function validate(token) {
  return TokenEntity.isValid(token)
}

/**
 * Factory for token schema service interface
 * @constructor
 * @public
 */
const TokenSchemaFactory = () => {
  return {
    getSchema,
    getEntity,
    validate
  }
}

export default new TokenSchemaFactory()
