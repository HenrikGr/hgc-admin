/**
 * Description: Session action creators - used to manage session information
 * in the store. Session information is based on access tokens returned
 * when authorized.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import { fetchStart, fetchComplete, fetchFailed } from './fetch';
import API from '../../api'

/**
 * Fetch a new access token based on the
 * refresh token stored in the state
 * @param dispatch
 * @param state
 */
function fetchRefreshSession(dispatch, state)  {
  const { refresh_token } = state.session;
  dispatch(fetchStart());
  API.refreshToken(refresh_token).then((json) => {
    dispatch(fetchComplete(json));
    dispatch(setSession(json));
  }).catch((json) => {
    dispatch(fetchFailed(json))
  })
}

/**
 * Thunk middleware to initiated the fetchRefreshSession
 * @returns {{type: string, fn: fetchRefreshSession}}
 */
export function refreshSession() {
  return {
    type: 'BEGIN_FETCH',
    fn: fetchRefreshSession,
  }
}

/**
 * Remove the session (token)
 * @returns {{type: string, token: {}}}
 */
export function removeSession() {
  return {
    type: 'REMOVE_SESSION',
    token: {},
  }
}

/**
 * Set the session (token)
 * @param token
 * @returns {{type: string, token: *}}
 */
export function setSession(token) {
  return {
    type: 'SET_SESSION',
    token
  }
}

