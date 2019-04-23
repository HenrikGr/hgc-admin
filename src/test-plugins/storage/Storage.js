/**
 * @prettier
 * @description: Storage mock plugin
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Storage mock plugin
 */
export default class Storage {
  /**
   * LocalStorage constructor
   * @param jest
   */
  constructor(jest) {
    /**
     * Define getItem property
     */
    Object.defineProperty(this, 'getItem', {
      enumerable: false,
      value: jest.fn(key => this[key] || null)
    })

    /**
     * Define setItem property
     */
    Object.defineProperty(this, 'setItem', {
      enumerable: false,
      // not mentioned in the spec, but we must always coerce to a string
      value: jest.fn((key, val = '') => {
        this[key] = val + ''
      })
    })

    /**
     * Define removeItem property
     */
    Object.defineProperty(this, 'removeItem', {
      enumerable: false,
      value: jest.fn(key => {
        delete this[key]
      })
    })

    /**
     * Define clear property
     */
    Object.defineProperty(this, 'clear', {
      enumerable: false,
      value: jest.fn(() => {
        Object.keys(this).map(key => delete this[key])
      })
    })

    /**
     * Define toString property
     */
    Object.defineProperty(this, 'toString', {
      enumerable: false,
      value: jest.fn(() => {
        return '[object Storage]'
      })
    })

    /**
     * Define key property
     */
    Object.defineProperty(this, 'key', {
      enumerable: false,
      value: jest.fn(idx => Object.keys(this)[idx] || null)
    })
  }

  /**
   * Get length
   * @returns {number}
   */
  get length() {
    return Object.keys(this).length
  }
}
