
import XHRService from './XHRService'
import profileSchema from '../../schemas/json/profile'
import config from './config'

/**
 * Profile API class
 * @class
 * @constructor
 * @public
 */
class ProfileAPI extends XHRService {
  constructor(config, schema) {
    super(config, schema)
  }

  setAuthorizationHeader(token) {
    super.setAuthorizationHeader(token)
  }

  /**
   * Find or create profile for the authenticated user
   * @returns {Promise<AxiosResponse<any>>}
   * @public
   */
  getMe() {
    return super.get('/api/profiles/me')
  }

  /**
   * Update profile for the authenticated user.
   * @param {object} entity - profile entity
   * @returns {Promise<AxiosResponse<any>>}
   * @public
   */
  updateMe(entity) {
    return super.update('/api/profiles/me', entity)
  }

  /**
   * Find profiles
   * Support for param queries such as;
   * - conditions (filtering),
   * - pagination, using page as query param,
   * - limit, defining number of items returned,
   * - sorting,
   * - projection,
   * - etc...
   * @param {object} params - query params
   * @returns {Promise<AxiosResponse<any>>}
   * @public
   */
  findByQuery(params) {
    return super.find('/api/profiles', { params: params })
  }

  /**
   * Get a profile by id
   * @param {string} id - id key for the profile
   * @returns {Promise<AxiosResponse<any>>}
   * @public
   */
  getById(id) {
    return super.get('/api/profiles/' + id)
  }

  /**
   * Update profile by id
   * @param {string} id - id key for the profile
   * @param {object} profile - profile entity
   * @returns {Promise<AxiosResponse<any>>}
   * @public
   */
  updateById(id, profile) {
    return super.put('/api/profiles/' + id, profile)
  }

  /**
   * Delete profile by id
   * @param {string} id - id key for the profile
   * @returns {Promise<AxiosResponse<any>>}
   * @public
   */
  deleteById(id) {
    return super.delete('/api/profiles/' + id)
  }

}

export default new ProfileAPI(config, profileSchema)



