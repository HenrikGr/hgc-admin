/**
 * @prettier
 * @description: FormFields
 * @author:   Henrik Grönvall
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// custom component
import TextField from '../../components/fields/TextField'
import SelectField from '../../components/fields/SelectField'
import { isEmpty } from '../../../utils/helper'

/**
 * FormFields
 */
export default class FormFields extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    entity: PropTypes.object.isRequired,
    uiModel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  /**
   * Fet selected services key
   * @param key
   * @returns {*}
   */
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
    return <TextField key={key} id={key} label={uiModel[key].label} value={entity[key]} onChange={onChange} />
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
