/**
 * @prettier
 * @description: FormProvider
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// Form context
import FormContext from './context/Form'

// Schema uiModel and UIModel
import UIModel from '../../domain/ui-service/UIModel'

/**
 * FormProvider
 * @class FormProvider
 * @public
 */
class FormProvider extends React.PureComponent {
  static propTypes = {
    /**
     * Label text for the form
     */
    formLabel: PropTypes.string.isRequired,
    /**
     * Data services to be rendered
     */
    entity: PropTypes.object.isRequired,
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
     * JSON Schema to be used to create uiModel and default data services
     */
    schema: PropTypes.object.isRequired,
  }

  /**
   * Constructor
   * @param props
   */
  constructor(props) {
    super(props)
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
      onReset()
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
   * Render the component
   * @returns {*}
   */
  render() {
    return (
      <FormContext.Provider
        value={{
          formLabel: this.props.formLabel,
          entity: this.props.entity,
          onChange: this.handleChange,
          onSubmit: this.handleSubmit,
          onReset: this.handleReset,
          onRemove: this.handleRemove,
          uiModel: this.uiModel,
        }}
      >
        {this.props.children}
      </FormContext.Provider>
    )
  }
}

export default FormProvider
