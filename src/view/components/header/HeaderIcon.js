/**
 * @prettier
 * @description: HeaderIcon component
 *
 * The component is dependent on the user context state and if the user is authenticated
 * clicking on the home icon will route the user either to the dashboard or the home route
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import { HomeLink, DashboardLink } from '../links'

// Consume user state from user context
import { withUserState } from '../../providers/withUserContext'

const styles = {
  icon: {
    marginLeft: -12,
    marginRight: 20
  }
}

/**
 * HeaderIcon
 * @param classes
 * @param context
 * @returns {*}
 * @constructor
 */
function HeaderIcon({ classes, context }) {
  return (
    <IconButton
      className={classes.icon}
      component={context.isAuth ? DashboardLink : HomeLink}
      color="inherit"
      aria-label="Menu"
    >
      <MenuIcon />
    </IconButton>
  )
}

/**
 * Property type check
 * @type {Object}
 * @private
 */
HeaderIcon.propTypes = {
  /**
   * Classes to extend the style
   * @private
   */
  classes: PropTypes.object.isRequired,
  /**
   * User context from the user provider
   * @private
   */
  context: PropTypes.object.isRequired
}

// Inject styles
export default withStyles(styles)(withUserState(HeaderIcon))
