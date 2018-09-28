/**
 * Description: Container component for the dashboard page
 *
 * Container components receives state trough props, supply
 * changes to the the presentation layer and update states
 * to the store.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import React from 'react'

// material-ui
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 8
  }
})

/**
 * DashboardPage
 * @param classes
 * @param rest
 * @returns {*}
 * @constructor
 */
const DashboardPage = ({ classes, ...rest }) => (
  <div className={classes.root}>
    <h2>Dashboard page</h2>
  </div>
)

export default withStyles(styles)(DashboardPage)
