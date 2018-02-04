/**
 * Description: Fetch utility module
 *
 * This module contains helper function for the fetch API.
 * Helper functions are;
 *
 * - status, that validate response statuses
 * - json, that returning the response stream into json format.
 * - blob, that returning a blob from response stream.
 * - b64toBlob, that returning a blob from a base64 data stream.
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-08-24
 */

// Polyfill
import 'whatwg-fetch';

// Import application error module
import AppError from './error';


/**
 * Parses the JSON returned by a network request
 * @param response, A response from a network request
 * @returns {Promise<any>}, The parsed JSON, status from the response
 */
export function parseJSON(response) {
  return new Promise((resolve) => response.json()
    .then((json) => resolve({
      status: response.status,
      ok: response.ok,
      json,
    })));
}

/**
 * Helper function to deal with response statuses
 * @param response
 * @returns {Promise.<*>}
 */
export function status(response) {
  if ((response.status >= 200 && response.status < 300)) {
    return Promise.resolve(response)
  }
  else {
    return Promise.reject(new AppError(response.status, response.code, response.more_info, response.statusText));
  }
}

/**
 * Helper function that returning the response stream into json format
 * @param response
 * @returns {*}
 */
export function json(response) {
  return response.json();
}

/**
 * Helper function to convert response stream to blob
 * @param response
 * @returns {*}
 */
export function blob(response) {
  return response.blob();
}

/**
 * Helper function to convert a stream to an array buffer
 * @param response
 * @returns {ArrayBuffer | Promise<ArrayBuffer>}
 */
export function arrayBuffer(response) {
  return response.arrayBuffer();
}

/**
 * Takes a string and base64 encode it.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 * @param str
 * @returns {string}
 */
export function strToBase64(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

/**
 * Helper function to convert a buffer to base64 string
 * @param data
 * @returns {Promise}
 */
export function uint8ToBase64(data) {
  return new Promise( function(resolve, reject) {
    
    let buffer = new Buffer(data);
    let binary = '';
    let len = buffer.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    resolve(window.btoa( binary ));
  });
}

/**
 * Helper function to create a blob from base64 data
 * @param data
 * @returns Promise
 */
export function b64toBlob(data) {
  return new Promise( function(resolve, reject) {
    const contentType='';
    const sliceSize=512;
    const byteCharacters = atob(data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
    
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    resolve(new Blob(byteArrays, {type: contentType}));
  });
  
}
