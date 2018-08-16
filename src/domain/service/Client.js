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

// Schema services
import ClientEntity from "../schemas/ClientEntity";

// XHR instance
const XHR = XHRService.getInstance();


/**
 * Validate a user object
 * @param client
 * @returns {*}
 */
function validateClient(client) {
  return ClientEntity.isValid(client);
}

/**
 * Create client
 * @param client
 * @returns {Promise<AxiosResponse<any>>}
 */
function createClient(client) {
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
 * @param params
 * @returns {Promise<AxiosResponse<any>>}
 */
function getClients(params) {
  return XHR.get("/api/clients", { params: params })
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}


/**
 * Get client by id
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function getClientById(id) {
  return XHR.get("/api/clients/" + id)
    .then(response => {
      return Promise.resolve(response.data);
    })
    .catch(error => {
      return Promise.reject(errorHandler(error));
    });
}


/**
 * Update client by id
 * @param id
 * @param client
 * @returns {Promise<AxiosResponse<any>>}
 */
function updateClientById(id, client) {
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
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
function deleteClientById(id) {
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
    validateClient,
    createClient,
    getClientById,
    updateClientById,
    deleteClientById,
    getClients,
  };
};

// Export interface
export default ClientServiceFactory();
