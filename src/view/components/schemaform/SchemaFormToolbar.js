/**
 * @prettier
 * @description: SchemaFormToolbar
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  toolbar: theme.mixins.toolbar
})

/**
 * SchemaFormToolbar
 * @param classes
 * @param children
 * @returns {*}
 * @constructor
 */
function SchemaFormToolbar({ classes, children }) {
  return (
    <Paper square={true}>
      <div className={classes.toolbar} />
      <Toolbar variant="dense">{children}</Toolbar>
    </Paper>
  )
}

/**
 * Property type check
 * @type {Object}
 */
SchemaFormToolbar.propTypes = {
  /**
   * Classes, can be used to override css styles
   */
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SchemaFormToolbar)
