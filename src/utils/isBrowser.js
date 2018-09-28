/**
 * Description: isBrowser helper
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Determine if we are in a browser
 * or a server environment
 * @type {Boolean}
 * @private
 */
const IS_BROWSER = (typeof window === 'undefined' ? 'undefined' : typeof (window)) === 'object';
export default IS_BROWSER;