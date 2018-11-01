/**
 * @prettier
 * @description: Profile schema service
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import profileSchema from '../schemas/json/profile'
import JSONSchema from './entity/JSONSchema'

const profileSchemaServices = new JSONSchema(profileSchema)
export default profileSchemaServices