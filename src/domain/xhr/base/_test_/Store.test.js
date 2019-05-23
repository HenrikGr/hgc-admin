/**
 * @prettier
 * @description: Store class unit test files
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import Store from '../Store'

/**
 * Store instance
 * @type {Store}
 */
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
      store.setItem('session', validToken)
      store.setItem('credentials', validCredentials)
      expect(store.getItem('session')).toEqual(validToken)
      expect(store.getItem('credentials')).toEqual(validCredentials)
    })

  })
})
