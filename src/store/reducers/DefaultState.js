/**
 * Description: Initial state module
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import CredentialsEntity from "../../domain/schemas/CredentialsEntity"
import ProfileEntity from "../../domain/schemas/ProfileEntity"
import UserEntity from "../../domain/schemas/UserEntity"
import ClientEntity from "../../domain/schemas/ClientEntity"

// Default state
const defaults = {
  status: 'Application started',
  session: {
    token: {},
    entity: CredentialsEntity.getDefaultEntity(),
    showPassword: false,
    redirectToReferrer: false,
    isFetching: false,
    error: {}
  },
  profile: {
    entity: ProfileEntity.getDefaultEntity(),
    uiModel: ProfileEntity.getUIModel(),
    isFetching: false,
    error: {}
  },
  users: {
    entity: UserEntity.getDefaultEntity(),
    entities: [],
    isFetching: false,
    error: {}
  },
  clients:{
    schema: ClientEntity.getSchema(),
    defaultClient: ClientEntity.getDefaultEntity(),
    uiModel: ClientEntity.getUIModel(),
    docs: [],
    isFetching: false,
    error: {},
  },
};


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
  return array.map(doc => {
    if (doc._id === element._id) {
      return element;
    }
    return doc;
  });
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


// Export the global state defaults and structure
export default defaults;