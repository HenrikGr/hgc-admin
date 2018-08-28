/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Import comparision functions
import {
  equal,
  gt,
  lt,
  idEqual,
  visibleEqual,
} from './comparisons'

/**
 * Helper function to detect arrays
 */
const isArray = Array.isArray;

/**
 * Generic arrayEquivalent procedure that is only concerned with stepping through the arrays.
 * From there, we'll build our other basic comparison functions like arrayEqual etc.
 *
 * arrayEquivalent takes comparison function, f, and two input arrays, xs and ys.
 * For the most part, all we do is call f (x) (y) for each element in the input arrays.
 * We return an early false if the length of the arrays is not equal
 *
 * @param f, comparision function
 * @returns {function(*): function(*): *}
 */
const arrayEquivalent = f => xs => ys =>
  xs.length === ys.length ?
    xs.every((x, i) => f(x)(ys[i])) :
    false;

/**
 * Generic deep version of arrayEquivalent.
 * @param f
 * @returns {function(*): function(*): *}
 */
const arrayDeepEquivalent = f =>
  arrayEquivalent(a => b => isArray(a) && isArray(b) ?
    arrayDeepEquivalent(f)(a)(b) :
    f(a)(b));


/**
 * arrayEqual can be defined with arrayEquivalent and a comparator function that
 * compares a to b using === (for strict equality) or any other comparision functions.
 * @type {function(*): function(*): *}
 */
export const arrayEqual = arrayEquivalent(equal);
export const arrayVisibleEqual = arrayEquivalent(visibleEqual);
export const arrayIdEqual = arrayEquivalent(idEqual);
export const arrayGt = arrayEquivalent(gt);
export const arrayLt = arrayEquivalent(lt);

// Comparing arrays with scalar values
//let x = [1,2,3];
//let y = [1,2,3];
//let z = ['1','2','3'];
//console.log('true? ', arrayEqual(x)(y));      //=> true
// (1 === 1) && (2 === 2) && (3 === 3)        //=> true
//console.log('false? ', arrayEqual(x)(z));     //=> false
// (1 === '1')                                //=> false
//console.log('true? ', arrayLooseEqual(x)(y)); //=> true
// (1 == '1') && (2 == '2') && (3 == '3')     //=> true

// Comparing array with object by property
//x = [{id:1}, {id:2}];
//y = [{id:1}, {id:2}];
//z = [{id:1}, {id:6}];
//console.log('true? ', arrayIdEqual(x)(y));      //=> true
// (1 === 1) && (2 === 2)                       //=> true
//console.log('false? ', arrayIdEqual(x)(z));     //=> false
// (1 === 1) && (2 === 6)                       //=> false


/**
 * arrayDeepEqual can be defined with arrayDeepEquivalent and a comparator function that
 * compares a to b using === (for strict equality) or any other comparision functions.
 * @type {function(*): function(*): *}
 */
export const arrayDeepEqual = arrayDeepEquivalent(equal);
// arrayIdEqual :: [a] -> [a] -> Bool
export const arrayIdDeepEqual = arrayDeepEquivalent(idEqual);

// Comparing deep arrays with scalar values
//x = [1,[2,[3]]];
//y = [1,[2,['3']]];
//console.log('false? ', arrayDeepEqual(x)(y));       //=> false
// (1 === 1) && (2 === 2) && (3 === '3')            //=> false
//console.log('true? ', arrayDeepLooseEqual(x)(y));   //=> true
// (1 == 1) && (2 == 2) && (3 == '3')               //=> true
//console.log('true? ', arrayIdDeepEqual(x)(y));  //=> true


/**
 * Append element, new array
 * @param array
 * @param element
 * @returns {*[]}
 */
export function appendElement(array, element) {
  return [ ...array, element ];
}

/**
 * Helper function to remove element(s) from array
 * Returns a new array, e.g non-mutating operation.
 * @param array
 * @param id
 * @returns {*}
 */
export function removeById(array, id) {
  // If more than one elements with the same id exist all will be removed.
  return array.filter(e => e._id !== id);
}

/**
 * Helper function to update an element in an array if the id is found
 * Returns a new array, e.g non-mutating operation.
 * @param array
 * @param element
 * @returns {*}
 */
export function updateElement(array, element) {
  return array.map(doc => ((doc._id === element._id ? element: doc)));
}

/**
 * Helper function that updated multiple elements in an array to the passed in array
 * Returns a new array, e.g non-mutating operation.
 * @param array
 * @param elements
 * @returns {*}
 */
export function updateElements(array, elements) {
  return array.map(doc => {
    let res = doc;
    elements.forEach(r => {
      if (doc._id === r._id) {
        res = r;
      }
    });
    return res;
  });
}


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
