/**
 * @prettier
 * @description: ApplicationLayout component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// Material ui
import { withStyles } from '@material-ui/core/styles'

// Providers
import UserProvider from '../providers/UserProvider'

// Main layout components
import NavigationBar from './navigation/NavigationBar'
import Main from './main/Main'

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  }
}

/**
 * Application layout component
 * @param {object} classes - style object used by material-ui withStyle HOC
 * @constructor
 * @public
 */
function AppLayout({ classes }) {
  return (
    <div className={classes.root}>
      <UserProvider>
        <NavigationBar />
        <Main />
      </UserProvider>
    </div>
  )
}

/**
 * Property type check
 * @type {Object}
 */
AppLayout.propTypes = {

  /**
   * Classes to extend style
   * @private
   */
  classes: PropTypes.object.isRequired
}

// Inject styles
export default withStyles(styles)(AppLayout)
