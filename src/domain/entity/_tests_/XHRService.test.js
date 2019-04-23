import axios from 'axios'
import XHRService from '../XHRService'

/**
 * Mock axios module
 */
jest.mock('axios')

describe('XHRService', () => {
  const xhr = new XHRService()

  test('should fetch users', () => {
    const resp = { data: [{ name: 'Bob' }] }
    axios.get.mockResolvedValue(resp)
    // or you could use the following depending on your use case:
    // axios.get.mockImplementation(() => Promise.resolve(resp))
    return xhr.get('/api/users').then(users => expect(users).toEqual(resp.data))
  })
})
