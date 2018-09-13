
import XHRService from './XHRService'
import tokenSchema from '../../schemas/json/token'
import config from './config'
const API_CLIENT_ID = process.env.REACT_APP_CLIENT_ID

/**
 * Token API class
 * @class
 * @constructor
 * @public
 */
class TokenAPI extends XHRService {
  constructor(config, schema, clientId) {
    super(config, schema)
    this.clientId = clientId
  }

  /**
   * Post credentials to get an access token
   * @param {object} credentials - entity object
   * @returns {Promise<AxiosResponse<any> | never | never>}
   * @public
   */
  post(credentials) {
    let params = {
      username: credentials.username,
      password: credentials.password,
      client_id: this.clientId,
      grant_type: 'password'
    }

    return super.post('/oauth/tokens', params)
  }

  /**
   * Post a refresh token to retrieve new access token
   * @param {string} refresh_token - refresh token used to get a new access token
   * @returns {Promise<AxiosResponse<any> | never | never>}
   * @public
   */
  refresh(refresh_token) {
    let params = {
      refresh_token: refresh_token,
      client_id: this.clientId,
      grant_type: 'refresh_token'
    }
    return super.post('/oauth/tokens', params)
  }

  /**
   * Remove token
   * @public
   */
  remove() {
    super.removeAuthorizationHeader()
  }
}

export default new TokenAPI(config, tokenSchema, API_CLIENT_ID)



