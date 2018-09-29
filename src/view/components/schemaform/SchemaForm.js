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
import SchemaFormMappedFields from './SchemaFormMappedFields'
import SchemaFormActions from './SchemaFormActions'
import Form from '../../providers/context/Form'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '744px',
    padding: 24
  }
}

/**
 * SchemaForm component
 * @param classes
 * @returns {*}
 * @constructor
 */
function SchemaForm({ classes }) {
  return (
    <Form.Consumer>
      {({ formLabel, uiModel, entity, onSubmit, onChange }) => {
        return (
          <form className={classes.root}>
            <FormLabel component="legend">{formLabel}</FormLabel>
            <SchemaFormMappedFields uiModel={uiModel} entity={entity} onChange={onChange} />
            <SchemaFormActions />
          </form>
        )
      }}
    </Form.Consumer>
  )
}

/**
 * Property type check
 * @type {Object}
 */
SchemaForm.propTypes = {
  /**
   * Classes, can be used to override css styles
   */
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SchemaForm)
