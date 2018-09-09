/**
 * @prettier
 * @description: Initial global state
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import userSchemaService from '../../domain/schemas/User'
import clientSchemaService from '../../domain/schemas/Client'
import UIModel from '../../domain/ui-service/UIModel'

/**
 * Default global state
 * @type {Object}
 * @constructor
 * @public
 */
const defaults = {
  status: 'Application started',
  error: {},
  isFetching: false,
  user: {
    isAuth: false,
    token: {},
    profile: {}
  },
  users: {
    entity: userSchemaService.getEntity(),
    entities: []
  },
  clients: {
    uiModel: new UIModel(clientSchemaService.getSchema()).getUIModel(),
    selectedId: '',
    entity: clientSchemaService.getEntity(),
    entities: []
  }
}

export default defaults
