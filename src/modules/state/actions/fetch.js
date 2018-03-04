/**
 * Description: Fetch action creators - used to log fetch calls to the
 * status branch of the state.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Helper function logging when fetch action started
 * @returns {{type: string}}
 */
export const fetchStart = () => ({
  type: 'FETCH_STARTED',
});

/**
 * Helper function returning json data on successful fetch
 * @param json
 * @returns {{type: string, json: *}}
 */
export const fetchComplete = (json) => ({
  type: 'FETCH_COMPLETE',
  json,
});

/**
 * Helper function returning error on fetch failed
 * @param error
 * @returns {{type: string, error: *}}
 */
export const fetchFailed = (error) => ({
  type: 'FETCH_FAILED',
  error,
});
