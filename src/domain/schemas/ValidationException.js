/**
 * Description: Utility functions
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Validation exceptions constructor
 * Used to throw validation errors
 * @param error
 * @constructor
 */
export default function ValidationException(error) {
  this.details = error;
  this.name = 'Validation error';
}
