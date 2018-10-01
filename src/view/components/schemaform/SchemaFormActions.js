/**
 * @prettier
 * @description: SchemaFormActions
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { withStyles } from '@material-ui/core/styles'

import DeleteButton from '../buttons/DeleteButton'
import SaveButton from '../buttons/SaveButton'
import ResetButton from '../buttons/ResetButton'

// Form context
import Form from '../../providers/context/Form'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
})

/**
 * SchemaFormActions
 * @returns {*}
 * @constructor
 */
function SchemaFormActions({ classes }) {
  return (
    <Form.Consumer>
      {({ selectedId, onSubmit, onRemove, onReset }) => {
        return selectedId !== '' ? (
          <div className={classes.root}>
            <SaveButton onSubmit={onSubmit} />
            <DeleteButton message="Delete this client?" onRemove={onRemove} />
            <ResetButton onReset={onReset} />
          </div>
        ) : (
          <div className={classes.root}>
            <SaveButton onSubmit={onSubmit} />
          </div>
        )
      }}
    </Form.Consumer>
  )
}

/**
 * Property type check
 * @type {Object}
 */
SchemaFormActions.propTypes = {
  /**
   * Classes, can be used to override css styles
   */
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SchemaFormActions)
