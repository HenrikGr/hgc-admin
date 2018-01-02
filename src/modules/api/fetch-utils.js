/*!
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
 * Helper function to deal with response statuses
 * @param response
 * @returns {Promise.<*>}
 */
export function status(response) {
  
  // Handle responses that are ok
  if ( (response.status >= 200 && response.status < 300) ) {
    return Promise.resolve(response)
  }
  else {
    return Promise.reject(new AppError(response.statusText, response.status));
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

export function arrayBuffer(response) {
  return response.arrayBuffer();
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
