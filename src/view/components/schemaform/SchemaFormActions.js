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
import Button from '@material-ui/core/Button/Button'
import { withStyles } from '@material-ui/core/styles'

// Form context
import Form from '../../providers/context/Form'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
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
            <Button className={classes.button} variant="raised" color="primary" onClick={onSubmit}>
              Save
            </Button>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              onClick={onRemove}
            >
              Delete
            </Button>
            <Button className={classes.button} variant="outlined" color="default" onClick={onReset}>
              Reset
            </Button>
          </div>
        ) : (
          <div className={classes.root}>
            <Button className={classes.button} variant="raised" color="primary" onClick={onSubmit}>
              Save
            </Button>
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
