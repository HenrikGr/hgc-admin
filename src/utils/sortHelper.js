/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

/**
 * Sort compare function
 * @param key
 * @param order
 * @returns {Function}
 */
export const sortCompareObject = (key, order='asc') => {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
};


//let x = ['henrik', 'anders', 'johnny', 'anton'];
let o = [{id: '1234', name: 'henrik'},{id:'2345', name: 'anders'},{id: '3456', name: 'johnny'},{id: '4567', name: 'anton'}];

console.log(o.slice().sort(sortCompareObject('id', 'asc')));
console.log(o.slice().sort(sortCompareObject('id', 'desc')));
