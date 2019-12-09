/**
 * @prettier
 * @description: Store class to provide an interface to the global session store
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license.
 */

/**
 * Store is a class providing a means to persist key value pairs in sessionStore
 *
 * The class extends the Map constructor to inherit the Maps methods such as;
 * - getItem,
 * - setItem,
 * - etc,
 *
 * The class should be used carefully and not be used to store sensitive data
 *
 * @example
 * const store = new Store()
 * store.setItem(key, value)
 * let value = store.getItem(key)
 * store.removeItem()
 *
 * @class
 */
class Store extends Map {
  /**
   * Get value by key from sessionStorage
   * @param {String} key - key to be used getting value from sessionStorage
   * @returns {string|null|any}
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
   * Set value to sessionStorage
   * @param {String} key - key to be used when storing value in sessionStorage
   * @param {Object|String} value - value to be stored
   */
  setItem(key, value) {
    // sessionStorage require value as string
    if (typeof value === 'object') value = JSON.stringify(value)
    sessionStorage.setItem(key, value)
  }

  /**
   * Delete value from sessionStorage
   * @param {String} key - key for the value to be removed, the key is removed as well
   */
  removeItem(key) {
    sessionStorage.removeItem(key)
  }
}

export default Store
