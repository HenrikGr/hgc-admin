/**
 * @prettier
 * @description: UIModel class
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import Entity from '../schemas/entity/Entity'

/**
 * UIModel class
 * @class
 * @public
 */
export default class UIModel extends Entity {
  constructor(schema) {
    super(schema)
    this._uiModel = {}
  }

  /**
   * Get ajv error message object
   * @param {string} name - name of a field
   * @param {object} error - ValidationException error object
   * @returns {object} - ajv error object
   */
  getError(name, error) {
    return super.getError(name, error)
  }

  /**
   * Get the error message as string for the named fields
   * @param {string} name - name of field
   * @param {object } error - ValidationException object
   * @returns {string} - the error message
   */
  getErrorMessage(name, error) {
    return super.getErrorMessage(name, error)
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Get all error messages as an array
   * @param {object} error - ValidationException object
   * @returns {array} - array of error messages
   */
  getErrorMessages(error) {
    return super.getErrorMessages(error)
  }

  /**
   * Get the UIModel for the properties in the schema
   * @returns {{}|*}
   */
  getUIModel() {
    // Filter out readOnly fields since we do not want them in our properties
    for (let [key, value] of Object.entries(this.schema.properties)) {
      if (!value.readOnly) {
        // Use title as label
        let title = value.title
        // Detect if prop is contains items (enum) - add .$ to key
        let prop = value.items ? key + '.$' : key
        this._uiModel[key] = super.getProps(prop, { label: title })
        this._uiModel[key]['id'] = key
        this._uiModel[key]['type'] = super.getTypeString(key)
        this._uiModel[key]['defaultValue'] = super.getInitialValue(key)
      }
    }

    return this._uiModel
  }

  /**
   *
   * @param entity
   */
  validate(entity) {
    return super.validate(entity)
  }

  /**
   *
   * @param entity
   * @returns {Object}
   */
  isValid(entity) {
    return super.isValid(entity)
  }
}
