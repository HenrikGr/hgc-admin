/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

/**
 * Helper function to check if object is empty
 * @param obj
 * @returns {boolean}
 */
export function isEmpty( obj ) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
