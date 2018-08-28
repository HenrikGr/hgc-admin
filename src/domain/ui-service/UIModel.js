/**
 * Description: UIModel class
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import invariant from 'fbjs/lib/invariant';
import resolveRef from './resolveRef';
import joinName from './joinName';

/**
 * UIModel class
 */
export default class UIModel {
  constructor(schema) {
    this.schema = schema;
    this._compiledSchema = {};
    this._uiModel = {};

    // Filter out readOnly fields since we do not want them in our properties
    for (let [key, value] of Object.entries(schema.properties)) {
      if (!value.readOnly) {
        // Use title as label
        let title = value.title;
        // Detect if prop is contains items (enum) - add .$ to key
        let prop = value.items ? key + '.$' : key;
        this._uiModel[key] = this.getProps(prop, { label: title });
        this._uiModel[key]['id'] = key;
        this._uiModel[key]['type'] = this.getTypeString(key);
        this._uiModel[key]['defaultValue'] = this.getInitialValue(key);
      }
    }
  }

  /**
   * Get ajv error message object if name exist in dataPath
   * @param {string} name - name of a field
   * @param {object} error - ValidationException error object
   * @returns {object} - ajv error object
   */
  getError(name, error) {
    return (
      error &&
      error.details &&
      error.details.find &&
      error.details.find(detail => detail.dataPath && detail.dataPath.substring(1) === name)
    );
  }

  /**
   * Get the error message as string for the named fields
   * @param {string} name - name of field
   * @param {object } error - ValidationException object
   * @returns {string} - the error message
   */
  getErrorMessage(name, error) {
    const scopedError = this.getError(name, error) || {};
    return (scopedError && scopedError.message) || '';
  }

  /**
   * Get all error messages as an array
   * @param {object} error - ValidationException object
   * @returns {array} - array of error messages
   */
  static getErrorMessages(error) {
    if (error) {
      if (Array.isArray(error.details)) {
        return error.details.reduce((acc, {message}) => acc.concat(message), []);
      }
      return [error.message || error];
    }
    return [];
  }

  /**
   * Get field definition from schema
   * Function to execute on each element in the array, taking four arguments:
   * - definition, It is the initialValue, if supplied (this.schema)
   * - next, The current element being processed in the array.
   * - nextIndex, The index of the current element being processed in the array.
   *   Starts at index 0, if an initialValue is provided, and at index 1 otherwise
   * - array, The array reduce() was called upon.
   * - initialValues, Value to use as the first argument to the first call of the callback.
   *   If no initial value is supplied, the first element in the array will be used.
   *   Calling reduce() on an empty array without an initial value is an error.
   * @param {string} name - name of field
   * @returns {object} - schema definition for the field
   */
  getField(name) {
    return joinName(null, name).reduce((definition, next, nextIndex, array) => {
      // Get the previous name part if any
      const previous = joinName(array.slice(0, nextIndex));
      // Check if name exist in the required array or if it exist in the compiled schema
      const isRequired = (definition.required || (this._compiledSchema[previous] || {}).required || []).includes(next);
      // Get the full key
      const _key = joinName(previous, next);
      // Get the compiled schema if any
      const _definition = this._compiledSchema[_key] || {};

      /**
       * Get the field definition
       */
      if (next === '$' || next === '' + parseInt(next, 10) ) {
        invariant(definition.type === 'array', 'Field not found in schema: "%s"', name);
        definition = Array.isArray(definition.items) ? definition.items[parseInt(next, 10)] : definition.items;

      } else if (definition.type === 'object') {
        definition = definition.properties[next];

      } else {
        const [{properties: combinedDefinition = {}} = {}] = ['allOf', 'anyOf', 'oneOf']
          .filter(key => definition[key])
          .map(key => definition[key].find(({properties = {}}) => properties[next]));

        definition = combinedDefinition[next];
      }

      // No definition found
      invariant(definition, 'Field not found in schema: "%s"', name);

      // If reference definition, resolve reference from schema
      if (definition.$ref) {
        definition = resolveRef(definition.$ref, this.schema);
      }

      ['allOf', 'anyOf', 'oneOf']
        .filter(key => definition[key])
        .forEach(key => {
          _definition[key] = definition[key].map(def => def.$ref ? resolveRef(def.$ref, this.schema) : def);
        });

      // Naive computation of combined type, properties and required
      if (['allOf', 'anyOf', 'oneOf']
        .filter(key => definition[key]).length) {
        _definition.type = ([].concat(_definition.allOf, _definition.anyOf, _definition.oneOf)
            .filter(def => def)
            .find(def => def.type)
          || {}
        ).type;

        const [properties, required] = [].concat(_definition.allOf, _definition.anyOf, _definition.oneOf)
          .filter(def => def)
          .reduce( ([_properties, _required], {properties, required}) => [
              Object.assign(_properties, properties), _required.concat(required)
            ],
            [{}, []]
          );

        _definition.properties = properties;
        _definition.required = required;
      }

      this._compiledSchema[_key] = Object.assign(_definition, { isRequired });
      return definition;

    }, this.schema);
  }

  /**
   * Get field definitions fort sub fields
   * @param name
   * @returns {*}
   */
  getSubFields(name) {
    if (!name) {
      return Object.keys(this.schema.properties);
    }
    const {
      type: _type,
      properties: _properties
    } = this.getField(name);
    const {
      type: fieldType = _type,
      properties: fieldProperties = _properties
    } = this._compiledSchema[name];

    if (fieldType === 'object') {
      return Object.keys(fieldProperties);
    }

    return [];
  }

  /**
   * Get properties based on field definition to be used for input components
   * @param name
   * @param label
   * @param opts
   * @param placeholder
   * @param disabled
   * @param props
   * @returns {{allowedValues, options: *, label: *, placeholder: string, required}}
   */
  getProps (name, {label = true, options: opts, placeholder, ...props} = {}) {
    const {
      enum: _enum,
      type: _type,
      options: _options,
    } = this.getField(name);
    const {
      enum: allowedValues = _enum,
      options = _options,
      type: fieldType = _type,
      isRequired
    } = this._compiledSchema[name];

    const [fieldName] = joinName(null, name).slice(-1).map(str => str.replace(/([A-Z])/g, ' $1'));
    const fieldNameCapitalized = fieldName.charAt(0).toUpperCase() + fieldName.slice(1).toLowerCase();

    const ready = {
      allowedValues,
      ...(fieldType === 'number' ? {decimal: true} : {}),
      options: opts || options,
      label: label === true ? fieldNameCapitalized : label || '',
      placeholder: placeholder === true ? fieldNameCapitalized : placeholder,
      required: isRequired
    };

    if (ready.options) {
      if (!Array.isArray(ready.options)) {
        ready.transform = value => ready.options[value];
        ready.allowedValues = Object.keys(ready.options);
      } else {
        ready.transform = value => ready.options.find(option => option.value === value).label;
        ready.allowedValues = ready.options.map(option => option.value);
      }
    }

    return {
      ...ready,
      ...props
    };
  }

  /**
   * Get javascript type for field type in schema
   * @param name
   * @returns {*}
   */
  getType(name) {
    const { type: _type, format: fieldFormat } = this.getField(name);
    const { type: fieldType = _type } = this._compiledSchema[name];

    if (fieldFormat === 'date-time') return Date;
    if (fieldType   === 'string')    return String;
    if (fieldType   === 'number')    return Number;
    if (fieldType   === 'integer')   return Number;
    if (fieldType   === 'object')    return Object;
    if (fieldType   === 'array')     return Array;
    if (fieldType   === 'boolean')   return Boolean;

    invariant(fieldType !== 'null', 'Field "%s" can not be represented as a type null', name);

    return fieldType;
  }

  /**
   * Get field type as string
   * @param name
   * @returns {*}
   */
  getTypeString(name) {
    const { type: _type, format: fieldFormat } = this.getField(name);
    const { type: fieldType = _type } = this._compiledSchema[name];

    if (fieldFormat === 'date-time')
      return fieldFormat;

    return fieldType;
  }
  /**
   * Get initial value from schema
   * This function is recursive if type is array.
   * @param {string} name - name of field
   * @param {object} props -
   * @returns {*}
   */
  getInitialValue(name, props = {}) {
    const { default: _default, type: _type } = this.getField(name);
    const { default: defaultValue = _default, type = _type } = this._compiledSchema[name];

    if (type === 'array') {
      // Recursive
      const item = this.getInitialValue(joinName(name, '0'));
      const items = props.initialCount || 0;
      return [...Array(items)].map(() => item);
    }

    if (type === 'object') {
      return {};
    }

    return defaultValue;
  }

  /**
   * Get the UIModel for the properties in the schema
   * @returns {{}|*}
   */
  getUIModel() {
    return this._uiModel;
  }

}