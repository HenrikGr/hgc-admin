/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */


/**
 * Helper function to detect arrays
 */
const isArray = Array.isArray;

/**
 * Comparision functions for strict equal arrays
 * @param x
 * @returns {function(*): boolean}
 */
const equal = x => y => x === y; // notice: triple equal

/**
 * Comparision (arbitrary) function greater than
 * @param x
 * @returns {function(*): boolean}
 */
const gt = x => y => x > y;

/**
 * Comparision (arbitrary) function greater than
 * @param x
 * @returns {function(*): boolean}
 */
const lt = x => y => y > x;

/**
 * Comparision function when comparing array of object by key ._id
 * @param x
 * @returns {function(*): boolean}
 */
const idEqual = x => y => x._id !== undefined && x._id === y._id;

/**
 * Comparision function  when comparing array of object by key ._id
 * @param x
 * @returns {function(*): boolean}
 */
const visibleEqual = x => y => x.visible !== undefined && x.visible === y.visible;


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
 *
 * @type {function(*): function(*): *}
 */
export const arrayEqual = arrayEquivalent(equal);

/**
 * arrayDeepEqual can be defined with arrayDeepEquivalent and a comparator function that
 * compares a to b using === (for strict equality) or any other comparision functions.
 *
 * @type {function(*): function(*): *}
 */
export const arrayDeepEqual = arrayDeepEquivalent(equal);

// arrayIdEqual :: [a] -> [a] -> Bool
export const arrayIdEqual = arrayEquivalent(idEqual);

// arrayVisibleEqual :: [a] -> [a] -> Bool
export const arrayVisibleEqual = arrayEquivalent(visibleEqual);

// arrayIdEqual :: [a] -> [a] -> Bool
export const arrayIdDeepEqual = arrayDeepEquivalent(idEqual);

// arrayGt :: [a] -> [a] -> Bool
export const arrayGt = arrayEquivalent(gt);

export const arrayLt = arrayEquivalent(lt);


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
//let o = [{id: '1234', name: 'henrik'},{id:'2345', name: 'anders'},{id: '3456', name: 'johnny'},{id: '4567', name: 'anton'}];

//console.log(o.slice().sort(sortCompareObject('id', 'asc')));
//console.log(o.slice().sort(sortCompareObject('id', 'desc')));

/**
 * Comparing arrays with scalar values
 */
//let x = [1,2,3];
//let y = [1,2,3];
//let z = ['1','2','3'];
//console.log('true? ', arrayEqual(x)(y));      //=> true
// (1 === 1) && (2 === 2) && (3 === 3)        //=> true
//console.log('false? ', arrayEqual(x)(z));     //=> false
// (1 === '1')                                //=> false
//console.log('true? ', arrayLooseEqual(x)(y)); //=> true
// (1 == '1') && (2 == '2') && (3 == '3')     //=> true

/**
 * Comparing deep arrays with scalar values
 */
//x = [1,[2,[3]]];
//y = [1,[2,['3']]];
//console.log('false? ', arrayDeepEqual(x)(y));       //=> false
// (1 === 1) && (2 === 2) && (3 === '3')            //=> false
//console.log('true? ', arrayDeepLooseEqual(x)(y));   //=> true
// (1 == 1) && (2 == 2) && (3 == '3')               //=> true

/**
 * Comparing array with object by property
 */
//x = [{id:1}, {id:2}];
//y = [{id:1}, {id:2}];
//z = [{id:1}, {id:6}];
//console.log('true? ', arrayIdEqual(x)(y));      //=> true
// (1 === 1) && (2 === 2)                       //=> true
//console.log('false? ', arrayIdEqual(x)(z));     //=> false
// (1 === 1) && (2 === 6)                       //=> false

//console.log('true? ', arrayIdDeepEqual(x)(y));  //=> true


//x = [5,10,20];
//y = [2,4,8];
//z = [6,12,24];
//console.log('true? ', arrayGt(x)(y));   //=> true
// (5 > 2) && (10 > 4) && (20 > 8)      //=> true
//console.log('false? ', arrayGt(x)(z));  //=> false
// (5 > 6)                              //=> false




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
