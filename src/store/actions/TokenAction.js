/**
 * @prettier
 * @description: Token action creator services
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import credentialsSchemaService from '../../domain/schemas/Credentials'
import tokenSchemaService from '../../domain/schemas/Token'
import tokenService from '../../domain/service/Token'
import {
  VALIDATION_ERROR,
  FETCH_VALIDATION_ERROR,
  FETCH_START,
  FETCH_ERROR,
  FETCH_SUCCESS,
  FETCH_TOKEN_SUCCESS,
  REMOVE_TOKEN
} from '../actions/constants'

/**
 * Helper function to validate fetched data via tokenSchemaService
 * @param {object} json - json object returned from profileService API
 * @returns {Function}
 * @private
 */
function fetchValidate(json) {
  return dispatch => {
    const error = tokenSchemaService.validate(json)
    if (error.message) {
      dispatch({ type: FETCH_VALIDATION_ERROR, payload: error })
      return Promise.reject(error)
    } else {
      dispatch({ type: FETCH_SUCCESS })
      dispatch({ type: FETCH_TOKEN_SUCCESS, payload: json })
      return Promise.resolve(json)
    }
  }
}

/**
 * Get a token
 * @param {object} credentials - credential object
 * @returns {Function}
 * @public
 */
function get(credentials) {
  return async function(dispatch) {
    const error = credentialsSchemaService.validate(credentials)
    if (error.message) {
      dispatch({ type: VALIDATION_ERROR, payload: error })
      return Promise.reject(error)
    } else {
      try {
        dispatch({ type: FETCH_START })
        const json = await tokenService.get(credentials)
        return dispatch(fetchValidate(json))
      } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: error })
        return Promise.reject(error)
      }
    }
  }
}

/**
 * Get a new token using the refresh token
 * @returns {function(*, *): Promise<T | never>}
 * @public
 */
function refresh() {
  return async function(dispatch, getState) {
    const { refresh_token } = getState().user.token
    try {
      dispatch({ type: FETCH_START })
      const json = await tokenService.refresh(refresh_token)
      return dispatch(fetchValidate(json))
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error })
      return Promise.reject(error)
    }
  }
}

/**
 * Removes session information from session state
 * It will also remove the authorization header
 * @returns {{type: string}}
 * @public
 */
function remove() {
  tokenService.remove()
  return { type: REMOVE_TOKEN }
}

/**
 * Interface constructor to token action creators
 * @returns {object} - object with token actions
 * @constructor
 * @private
 */
function TokenActionFactory() {
  return {
    get,
    refresh,
    remove
  }
}

export default new TokenActionFactory()
