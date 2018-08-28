/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Comparision functions for strict equal arrays
 * @param x
 * @returns {function(*): boolean}
 */
export const equal = x => y => x === y; // notice: triple equal

/**
 * Comparision (arbitrary) function greater than
 * @param x
 * @returns {function(*): boolean}
 */
export const gt = x => y => x > y;

/**
 * Comparision (arbitrary) function greater than
 * @param x
 * @returns {function(*): boolean}
 */
export const lt = x => y => y > x;

/**
 * Comparision function when comparing array of object by key ._id
 * @param x
 * @returns {function(*): boolean}
 */
export const idEqual = x => y => x._id !== undefined && x._id === y._id;

/**
 * Comparision function  when comparing array of object by key .visible
 * @param x
 * @returns {function(*): boolean}
 */
export const visibleEqual = x => y => x.visible !== undefined && x.visible === y.visible;
