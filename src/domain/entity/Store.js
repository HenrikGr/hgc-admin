/**
 * @prettier
 * @description: Store
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Store is a class providing a means to
 * persist key value pairs in sessionStore
 *
 * @example
 * const store = new Store()
 * store.setItem(key, value)
 * let value = store.getItem(key)
 * store.removeItem()
 *
 * @constructor
 */
class Store extends Map {
  /**
   * Get value from store
   * @param key
   * @returns {*}
   */
  getItem(key) {
    const value = sessionStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch (e) {
        // TODO: Throw syntax error if JSON.parse fails
        return null
      }
    } else {
      return value
    }
  }

  /**
   * Set value to store
   * @param key
   * @param value
   */
  setItem(key, value) {
    // TODO: Throw syntax error if JSON.stringify fails
    if (typeof value === 'object') value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
  }

  /**
   * Delete value from the store
   * @param key
   */
  removeItem(key) {
    sessionStorage.removeItem(key)
  }
}

export default Store
