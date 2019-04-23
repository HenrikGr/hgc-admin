/**
 * @prettier
 * @description: Form
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import FormLabel from '@material-ui/core/FormLabel'
import { withStyles } from '@material-ui/core/styles'

// custom component
import FormActions from './FormActions'
import FormMappedFields from './FormMappedFields'
import FormContext from '../../providers/context/Form'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '744px',
    padding: 24
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
})

/**
 * Form component
 * @param classes
 * @returns {*}
 * @constructor
 */
function Form({ classes }) {
  return (
    <FormContext.Consumer>
      {({ formLabel, entity, onSubmit, onChange, onRemove, onReset, uiModel }) => {
        return (
          <form className={classes.root}>
            <FormLabel component="legend">{formLabel}</FormLabel>
            <FormMappedFields uiModel={uiModel} entity={entity} onChange={onChange} />
            <FormActions
              entity={entity}
              onSubmit={onSubmit}
              onRemove={onRemove}
              onReset={onReset}
            />
          </form>
        )
      }}
    </FormContext.Consumer>
  )
}

/**
 * Property type check
 * @type {Object}
 */
Form.propTypes = {
  /**
   * Classes, can be used to override css styles
   */
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Form)
