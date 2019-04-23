import axios from 'axios'
import SessionEntity from '../SessionEntity'
import schema from '../schemas/token'

// Mock axios library
jest.mock('axios')

/**
 * SessionEntity
 */
describe('SessionEntity entity class', () => {
  // Mock data
  const validTokenEntity = {
    access_token: '5d715b33253a5c513e2b5914cfd4c52791ccde3f',
    token_type: 'Bearer',
    expires_in: 1799,
    refresh_token: 'fa3ea25bce4966ddba3b3851d6399473a1dfc254',
    scope: 'admin'
  }

  let sessionMgr = new SessionEntity(schema)

  describe('#Instance', () => {
    test('works with correct instance type and properties', () => {
      expect(sessionMgr).toBeInstanceOf(SessionEntity)
      expect(sessionMgr).toHaveProperty('_validator')
      expect(sessionMgr).toHaveProperty('_entityMgr')
    })
  })

  describe('#Public methods', () => {
    test('should create token entity', () => {
      const resp = { data: validTokenEntity }
      axios.post.mockResolvedValue(resp)
      return sessionMgr.createSession('henrik', 'Kjc9023DC').then(response => {
        expect(response).toHaveProperty('isAuth')
        expect(response).toHaveProperty('expires_in')
        expect(response).toHaveProperty('expiresAt')
      })
    })

    test('should get correct persisted entity', () => {
      expect(sessionMgr.getPersistedEntity()).toMatchObject(validTokenEntity)
    })

    test('should update token entity correct', () => {
      const resp = { data: validTokenEntity }
      axios.put.mockResolvedValue(resp)
      return sessionMgr.refreshSession('id', validTokenEntity).then(response => {
        expect(response).toHaveProperty('isAuth')
        expect(response).toHaveProperty('expires_in')
        expect(response).toHaveProperty('expiresAt')
      })
    })

    test('should get correct persisted entity', () => {
      expect(sessionMgr.getPersistedEntity()).toEqual(validTokenEntity)
    })
  })
})
