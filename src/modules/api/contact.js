/*
 * Description: Module for the contact API
 *
 * The contact API consist of;
 * - getContacts        = GET /api/contacts
 * - getContactById     = GET /api/contacts/:id
 * - createContact      = POST /api/contacts (*)
 * - updateContactById  = PUT /api/contacts/:id
 * - deleteContactById  = DELETE /api/contacts/:id
 *
 * All POST/PUT ops must use a form with the Content_Type set to "application/x-www-form-urlencoded; charset=UTF-8"
 * All GET or DELETE ops must set the Content_Type to "application/json",
 *
 * For all routes that require authorization, the header must also include
 * "Authorization": Bearer<authorization token>.
 *
 * (*), is open route(s) that does not require authorization or authentication.
 *
 *
 *
 * Author:  Henrik
 * File:    
 * Version: 0.0.1
 *
 * Created: 2016-08-08
 */
// fetch polyfill
import 'whatwg-fetch';

// Import helper function to use for fetch status validation and response management
import { status, json } from './fetch-utils';

// Import storage api
import Store from './store';


/**
 * API method to get contacts
 * @param url
 * @returns {Promise}
 */
const getContacts = ( url ) => {

  // Return promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
  
    fetch( url, options )
      .then( status )
      .then( json )
      .then( ( json ) => {
        resolve( json );
      }).catch( ( error ) => {
        reject( error );
      });
    
  })
  
};


/**
 * API method to get a specific contact
 * @param url
 * @returns {Promise}
 */
const getContactById = ( url ) => {
  
  // Return promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
  
    fetch( url, options )
      .then( status )
      .then( json )
      .then( ( json ) => {
        resolve( json );
      }).catch( ( error ) => {
        reject( error );
      });
  
  })
  
};


/**
 * API method to create a new contact
 * @param url
 * @param body
 * @returns {Promise}
 */
const createContact = ( url, body ) => {
  
  // Return promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: body,
      credentials: "omit"
    };
    
    fetch( url, options )
      .then( status )
      .then( json )
      .then( ( json ) => {
        resolve( json );
      }).catch( ( error ) => {
        reject( error );
    });
  
  })
  
};


/**
 * API method to update a specific contact
 * @param url
 * @param body
 * @returns {Promise}
 */
const updateContactById = ( url, body ) => {
  
  // Return promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      body: body,
      credentials: "omit"
    };

    fetch( url, options )
      .then( status )
      .then( json )
      .then( ( json ) => {
        resolve( json );
      }).catch( ( error ) => {
        reject( error );
      });
  
  })
  
};


/**
 * API method to delete a specific contact
 * @param url
 * @returns {Promise}
 */
const deleteContactById = ( url ) => {
  
  // Return promise
  return new Promise( function( resolve, reject ) {
  
    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + Store.getAuthorizationToken()
      },
      credentials: "omit"
    };
  
    fetch( url, options )
      .then( status )
      .then( json )
      .then( ( json ) => {
        resolve( json );
      }).catch( ( error ) => {
        reject( error );
      });
  
  })
  
};


/**
 * Export api methods
 */
export { getContacts, getContactById, createContact, updateContactById, deleteContactById }