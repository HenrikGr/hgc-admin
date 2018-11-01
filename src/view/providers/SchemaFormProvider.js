/**
 * @prettier
 * @description: SchemaFormProvider
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// SchemaForm context
import Form from './context/Form'

// Schema uiModel and Entity
import UIModel from '../../domain/ui-service/UIModel'
import Entity from '../../domain/ui-service/Entity'

/**
 * SchemaFormProvider
 * @class SchemaFormProvider
 * @public
 */
class SchemaFormProvider extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    /**
     * Selected client id
     */
    selectedId: PropTypes.string.isRequired,
    /**
     * Selected entity
     */
    entity: PropTypes.object.isRequired,
    /**
     * Entity array
     */
    entities: PropTypes.array.isRequired,
    /**
     * onChange callback
     */
    onChange: PropTypes.func.isRequired,
    /**
     * onSubmit callback
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * onRemove callback
     */
    onRemove: PropTypes.func.isRequired,
    /**
     * onReset callback
     */
    onReset: PropTypes.func.isRequired,
    /**
     * onSelect callback
     */
    onSelect: PropTypes.func.isRequired
  }

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props)

    // Create a default entity and uiModel based on the schema
    this.defaultEntity = new Entity(this.props.schema).getEntity()
    this.uiModel = new UIModel(this.props.schema).getUIModel()
  }

  /**
   * Event handler for input updates - update global state
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    const { onChange } = this.props
    if (typeof onChange === 'function') {
      onChange(prop, event.target.value)
    }
  }

  /**
   * Event handler for submitting form data
   * @param event
   * @returns {Function}
   */
  handleSubmit = event => {
    const { onSubmit } = this.props
    event.preventDefault()
    if (typeof onSubmit === 'function') {
      onSubmit()
    }
  }

  /**
   * Event handler to reset form with schema default values
   * @returns {Function}
   */
  handleReset = () => {
    const { onReset } = this.props
    if (typeof onReset === 'function') {
      onReset(this.defaultEntity)
    }
  }

  /**
   * Event handler to handel remove
   * @returns {Function}
   */
  handleRemove = () => {
    const { onRemove } = this.props
    if (typeof onRemove === 'function') {
      onRemove()
    }
  }

  /**
   * Event handler to provide selected entity
   * @param event
   * @param value
   * @returns {Function}
   */
  handleSelect = (event, value) => {
    const { entities, onSelect } = this.props
    const selectedEntity = entities.filter(entity => entity._id === value)
    if (typeof onSelect === 'function') {
      onSelect(...selectedEntity)
    }
  }

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    return (
      <Form.Provider
        value={{
          selectedId: this.props.entity._id ? this.props.entity._id : '',
          entity: this.props.entity,
          entities: this.props.entities,
          uiModel: this.uiModel,
          formLabel: this.props.formLabel,
          onChange: this.handleChange,
          onSubmit: this.handleSubmit,
          onReset: this.handleReset,
          onRemove: this.handleRemove,
          onSelect: this.handleSelect
        }}
      >
        {this.props.children}
      </Form.Provider>
    )
  }
}

export default SchemaFormProvider
