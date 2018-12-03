/**
 * @prettier
 * @description:
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import FormLabel from '@material-ui/core/FormLabel'
import { withStyles } from '@material-ui/core/styles'

// custom component
import FormMappedFields from './FormMappedFields'
import FormContext from '../../providers/context/Form'
import SaveButton from '../buttons/SaveButton'
import DeleteButton from '../buttons/DeleteButton'
import ResetButton from '../buttons/ResetButton'

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
      {({ selectedId, formLabel, entity, onSubmit, onChange, onRemove, onReset, uiModel }) => {
        return (
          <form className={classes.root}>
            <FormLabel component="legend">{formLabel}</FormLabel>
            <FormMappedFields uiModel={uiModel} entity={entity} onChange={onChange} />
            {selectedId !== '' ? (
            <div className={classes.actions}>
              <SaveButton onSubmit={onSubmit} />
              <DeleteButton message="Delete this client?" onRemove={onRemove} />
              <ResetButton onReset={onReset} />
            </div>
            ) : (
            <div className={classes.action}>
              <SaveButton onSubmit={onSubmit} />
            </div>
            )}
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
