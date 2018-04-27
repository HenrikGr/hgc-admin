/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Helper function to check if object is empty
 * @param obj
 * @returns {boolean}
 */
export function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Format hours, minutes and seconds to a readable string
 * @param hours
 * @param minutes
 * @param seconds
 * @returns {string}
 */
export const formatExpiresIn = ({ hours, minutes, seconds }) => {
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return hours + ":" + minutes + ":" + seconds;
};

/**
 * Parse number of seconds into hour, minutes and seconds
 * @param seconds
 * @returns {{hours: number, minutes: number, seconds: number}}
 */
export const parseHHMMSS = seconds => {
  return {
    hours: Math.floor(seconds / 3600) % 24,
    minutes: Math.floor(seconds / 60) | 0,
    seconds: (seconds % 60) | 0
  };
};
