/**
 * @prettier
 * @description: Credentials schema services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import credentialSchema from './json/credentials'
import JSONSchema from './entity/JSONSchema'

const credentialSchemaServices = new JSONSchema(credentialSchema)
export default credentialSchemaServices
