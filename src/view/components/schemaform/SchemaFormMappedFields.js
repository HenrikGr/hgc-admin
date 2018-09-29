/**
 * @prettier
 * @description: SchemaFormMappedFields
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// custom component
import TextField from '../fields/TextField'
import SelectField from '../fields/SelectField'
import { isEmpty } from '../../../utils/helper'

/**
 * SchemaFormMappedFields
 */
export default class SchemaFormMappedFields extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    entity: PropTypes.object.isRequired,
    uiModel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  getSelectField = key => {
    const { uiModel, entity, onChange } = this.props
    return (
      <SelectField
        key={key}
        id={key}
        label={uiModel[key].label}
        value={entity[key]}
        options={uiModel[key].allowedValues}
        onChange={onChange}
      />
    )
  }

  getTextField = key => {
    const { uiModel, entity, onChange } = this.props
    return (
      <TextField
        key={key}
        id={key}
        label={uiModel[key].label}
        value={entity[key]}
        onChange={onChange}
      />
    )
  }

  /**
   * Map fields according to the uiModel
   * @returns {Array}
   */
  getMappedFields = () => {
    const { uiModel } = this.props
    let fields = []

    Object.keys(uiModel).forEach(key => {
      switch (uiModel[key].type) {
        case 'array':
          fields.push(this.getSelectField(key))
          break

        default:
          fields.push(this.getTextField(key))
          break
      }
    })

    return fields
  }

  render() {
    return <React.Fragment>{!isEmpty(this.props.entity) && this.getMappedFields()}</React.Fragment>
  }
}
