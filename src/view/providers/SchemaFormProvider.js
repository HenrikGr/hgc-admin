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

// SchemaForm
import Form from './context/Form'

import UIModel from '../../domain/ui-service/UIModel'
import Entity from '../../domain/schemas/entity/Entity'

/**
 *
 * @class SchemaFormProvider
 * @public
 */
class SchemaFormProvider extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    schema: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
    entities: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props)

    // Create a default entity based on the schema
    this.defaultEntity = new Entity(this.props.schema).getEntity()

    // Set initial state
    this.state = {
      entity: {},
      uiModel: new UIModel(this.props.schema).getUIModel()
    }
  }

  /**
   * Set received model in state
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    console.log('ComponentDidUpdate')
    if (this.props.entity !== prevProps.entity) {
      console.log('componentDidUpdate - new entity', this.props.entity._id)
      this.setState({
        entity: this.props.entity,
      })
    }
  }

  handleChange = prop => event => {
    const { onChange } = this.props
    let newEntity = { ...this.state.entity }
    newEntity[prop] = event.target.value
    this.setState({ entity: newEntity })

    if (typeof onChange === 'function') {
      onChange(newEntity)
    }
  }

  handleSubmit = event => {
    const { onSubmit } = this.props
    event.preventDefault()

    if (typeof onSubmit === 'function') {
      onSubmit(this.state.entity)
    }
  }

  handleReset = () => {
    const { onReset } = this.props
    this.setState({ entity: this.defaultEntity })

    if (typeof onReset === 'function') {
      onReset(this.defaultEntity)
    }
  }

  handleRemove = () => {
    const { onRemove } = this.props
    if (typeof onRemove === 'function') {
      onRemove(this.state.entity)
    }
  }

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
    console.log('Form.Provider - render', this.props.entity._id)
    return (
      <Form.Provider
        value={{
          ...this.state,
          entities: this.props.entities,
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
