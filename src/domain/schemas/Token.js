/**
 * @prettier
 * @description: Token schema services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import tokenSchema from '../schemas/json/token'
import JSONSchema from './entity/JSONSchema'

const tokenSchemaServices = new JSONSchema(tokenSchema)
export default tokenSchemaServices
