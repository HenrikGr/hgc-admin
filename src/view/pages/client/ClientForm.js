/**
 * @prettier
 * @description: ClientForm
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

import FormLabel from '@material-ui/core/FormLabel/index'
import { withStyles } from '@material-ui/core/styles/index'

import FormFields from './FormFields'

// Schema uiModel and UIModel
import UIModel from '../../../domain/ui-service/UIModel'
import SaveButton from '../../components/buttons/SaveButton'
import DeleteButton from '../../components/buttons/DeleteButton'
import ResetButton from '../../components/buttons/ResetButton'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '744px',
    padding: theme.spacing(3)
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
})

/**
 * ClientForm
 * @class ClientForm
 * @public
 */
class ClientForm extends React.PureComponent {
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
    schema: PropTypes.object.isRequired
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
    const { classes, formLabel, entity } = this.props
    const hasEntity = !!entity._id // Control visible buttons based on services exist or not

    return (
      <form className={classes.root}>
        <FormLabel component="legend">{formLabel}</FormLabel>
        <FormFields uiModel={this.uiModel} entity={entity} onChange={this.handleChange} />
        <div className={classes.actions}>
          {hasEntity ? (
            <React.Fragment>
              <SaveButton onClick={this.handleSubmit} />
              <DeleteButton message={'Delete ' + entity.name + ' ?'} onClick={this.handleRemove} />
              <ResetButton onClick={this.handleReset} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SaveButton onClick={this.handleSubmit} />
              <ResetButton onClick={this.handleReset} />
            </React.Fragment>
          )}
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(ClientForm)
