/**
 * @prettier
 * @description: User schema services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import userSchema from '../schemas/json/user'
import JSONSchema from './entity/JSONSchema'

const userSchemaServices = new JSONSchema(userSchema)
export default userSchemaServices
