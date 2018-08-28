/**
 * Description: Client business logic module
 *
 * Client service exposes a set of function representing business logic for client data.
 * The business logic consist of a set of CRUD API functions and other types of services
 * such as validating inputs before performing the remote calls.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// query string parser
import qs from 'qs';

// XHR service
import XHRService, { errorHandler } from "./XHRService";

// Credentials schema
import clientSchema from '../schemas/json/client'

// Base entity model
import Entity from './entity/Entity'

// Entity model instance
const ClientEntity = new Entity(clientSchema);

// XHR instance
const XHR = XHRService.getInstance();

/**
 * Get client schema
 * @returns {object} - client json schema
 */
function getSchema() {
  return clientSchema;
}

/**
 * Get client default entity
 * @returns {object} - client default entity
 */
function getEntity() {
  return ClientEntity.getEntity();
}

/**
 * Validate a client object
 * @param {object} client - profile entity
 * @returns {object} - client entity of no error otherwise entity validation exception
 */
function validate(client) {
  return ClientEntity.isValid(client);
}

/**
 * Create client
 * @param {object} client - client entity
 * @returns {Promise<AxiosResponse<any>>}
 */
function create(client) {
  return XHR.post("/api/clients", qs.stringify(client))
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Get clients
 * Support for param queries such as;
 * - conditions (filtering),
 * - pagination, using page as query param,
 * - limit, defining number of items returned,
 * - sorting,
 * - projection,
 * - etc...
 * @param {object} params - query params
 * @returns {Promise<AxiosResponse<any>>}
 */
function findByQuery(params) {
  return XHR.get("/api/clients", { params: params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Update client by id
 * @param {string} id - id key for a client
 * @param {object} client - client entity
 * @returns {Promise<AxiosResponse<any>>}
 */
function updateById(id, client) {
  return XHR.put("/api/clients/" + id, qs.stringify(client))
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Delete client by id
 * @param {string} id - id key for a client
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteById(id) {
  return XHR.delete("/api/clients/" + id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}

/**
 * Export interface for the client service
 * @constructor
 */
export const ClientServiceFactory = () => {
  return {
    getSchema,
    getEntity,
    validate,
    create,
    findByQuery,
    updateById,
    deleteById,
  };
};

// Export interface
export default new ClientServiceFactory();
