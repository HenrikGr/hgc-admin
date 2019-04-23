import Store from '../Store'

let store = new Store()
let validToken = {
  access_token: '5d715b33253a5c513e2b5914cfd4c52791ccde3f',
  token_type: 'Bearer',
  expires_in: 1799,
  refresh_token: 'fa3ea25bce4966ddba3b3851d6399473a1dfc254',
  scope: 'admin'
}
let validCredentials = { username: 'henrik', password: 'qwerty' }

/**
 * SessionSTore test
 */
describe('Store class', () => {
  describe('#Instance', () => {
    test('works with correct instance type', () => {
      expect(store).toBeInstanceOf(Map)
      expect(store).toBeInstanceOf(Store)
    })
  })

  describe('#Methods', () => {
    test('works with sessionStorage API', () => {
      sessionStorage.setItem('session', JSON.stringify(validToken))
      expect(sessionStorage.getItem('session')).toEqual(JSON.stringify(validToken))
      expect(sessionStorage.key(0)).toBe('session')
      expect(sessionStorage.length).toBe(1)

      sessionStorage.removeItem('session')
      expect(sessionStorage.length).toBe(0)
    })

    test('works with store API set property', () => {
      store.set('session', validToken)
      store.set('credentials', validCredentials)
      expect(Store.get('session')).toEqual(validToken)
      expect(Store.get('credentials')).toEqual(validCredentials)
    })

    test('works with store API changing key-value pairs(s)', () => {
      store.set('session', validCredentials)
      store.set('credentials', validToken)
      expect(Store.get('session')).toEqual(validCredentials)
      expect(Store.get('credentials')).toEqual(validToken)
    })

    test('works with store API deleting a key value pair', () => {
      store.delete('session')
      store.delete('credentials')
      expect(Store.get('session')).toBeNull()
      expect(Store.get('credentials')).toBeNull()
    })

    test('works with store API clear all value pair(s)', () => {
      store.set('session', validCredentials)
      store.set('credentials', validToken)
      store.clear()
      expect(Store.get('session')).toBeNull()
      expect(Store.get('credentials')).toBeNull()
    })
  })
})
