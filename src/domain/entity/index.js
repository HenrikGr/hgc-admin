import tokenSchema from './schemas/token'
import profileSchema from './schemas/profile'
import clientSchema from './schemas/client'
import userSchema from './schemas/user'

import SessionEntity from './SessionEntity'
import ProfileEntity from './ProfileEntity'
import ClientEntity from './ClientEntity'
import ScopeEntity from './ScopeEntity'
import UserEntity from './UserEntity'

/**
 * Session entity manager
 * @type {SessionEntity}
 */
const sessionMgr = new SessionEntity(tokenSchema)

/**
 * Profile entity manager
 * @type {ProfileEntity}
 */
const profileMgr = new ProfileEntity(profileSchema)

/**
 * Client entity manager
 * @type {ClientEntity}
 */
const clientMgr = new ClientEntity(clientSchema)

/**
 * Scope entity manager
 * @type {ScopeEntity}
 */
const scopeMgr = new ScopeEntity()

/**
 * User entity manager
 * @type {UserEntity}
 */
const userMgr = new UserEntity(userSchema)

export { sessionMgr, profileMgr, clientMgr, scopeMgr, userMgr }
