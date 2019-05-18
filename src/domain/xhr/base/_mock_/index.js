/**
 * @prettier
 * @description: Global object for the Storage mock plug-in
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license
 */
import Storage from './Storage'

/**
 * The plug-in
 */
export default function() {
  /**
   * Add localStorage to the fake global
   */
  if (typeof global._localStorage !== 'undefined') {
    Object.defineProperty(global, '_localStorage', {
      value: new Storage(jest),
      writable: false
    })
  } else {
    global.localStorage = new Storage(jest)
  }

  /**
   * Add sessionStorage to the fake global
   */
  if (typeof global._sessionStorage !== 'undefined') {
    Object.defineProperty(global, '_sessionStorage', {
      value: new Storage(jest),
      writable: false
    })
  } else {
    global.sessionStorage = new Storage(jest)
  }
}
