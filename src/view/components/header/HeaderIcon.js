/**
 * @prettier
 * @description: HeaderIcon component
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import { HomeLink, DashboardLink } from '../links'

// Consume user state from user context
import { withSessionState } from '../../providers/withSessionContext'

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
   * Store context from the user provider
   * @private
   */
  context: PropTypes.object.isRequired
}

// Inject styles
export default withStyles(styles)(withSessionState(HeaderIcon))
