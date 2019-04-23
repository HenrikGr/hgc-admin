/**
 * @prettier
 * @description: JSONValidator services based on Ajv
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Credential JSON Schema
 * @type {JSON}
 */
import credentialSchema from '../schemas/credentials'

/**
 * Token JSON Schema
 * @type {JSON}
 */
import tokenSchema from '../schemas/token'

/**
 * User JSON Schema
 * @type {JSON}
 */
import userSchema from '../schemas/user'

/**
 * Credential JSON Schema
 * @type {JSON}
 */
import profileSchema from '../schemas/profile'

/**
 * Client JSON Schema
 * @type {JSON}
 */
import clientSchema from '../schemas/client'

/**
 * JSON Schema validator
 * @type {JSONValidator}
 */
import JSONValidator from './JSONValidator'

/**
 * Credential validator
 * @type {JSONValidator}
 */
const CredentialsValidator = new JSONValidator(credentialSchema)

/**
 * Token validator
 * @type {JSONValidator}
 */
const TokenValidator = new JSONValidator(tokenSchema)

/**
 * Profile validator
 * @type {JSONValidator}
 */
const ProfileValidator = new JSONValidator(profileSchema)

/**
 * User validator
 * @type {JSONValidator}
 */
const UserValidator = new JSONValidator(userSchema)

/**
 * Client validator
 * @type {JSONValidator}
 */
const ClientValidator = new JSONValidator(clientSchema)


export {
  CredentialsValidator,
  TokenValidator,
  ProfileValidator,
  UserValidator,
  ClientValidator
}