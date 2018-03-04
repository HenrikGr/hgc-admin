/**
 * Description:
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
 * Fetch current user
 * @param dispatch
 * @param state
 */
const fetchCurrentUser = (dispatch, state) => {
  const { access_token } = state.session.token;
  dispatch(fetchStart());
  API.getMe(access_token).then((json) => {
    dispatch(fetchComplete(json));
    dispatch(setUser(json))
  }).catch((json) => {
    dispatch(fetchFailed(json))
  })
};

/**
 * Set user
 * @param user
 * @returns {{type: string, user: *}}
 */
const setUser = (user) => ({
  type: 'SET_USER',
  user
});

/**
 * Fetch user
 * @returns {{type: string, fn: function(*, *)}}
 */
export const fetchUser = () => {
  return {
    type: 'BEGIN_FETCH',
    fn: fetchCurrentUser,
  }
};

