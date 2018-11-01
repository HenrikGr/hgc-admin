/**
 * @prettier
 * @description: Client schema services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import clientSchema from '../schemas/json/client'
import JSONSchema from './entity/JSONSchema'

const clientSchemaServices = new JSONSchema(clientSchema)
export default clientSchemaServices
