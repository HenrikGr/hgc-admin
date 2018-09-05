/**
 * @prettier
 * @description: Main component that renders different content pages
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

// custom route handler for protected routes
import ProtectedRoute from '../ProtectedRoute'

// Content pages
import NotFoundPage from '../../pages/NotFound'
import ClientPage from '../../pages/ClientPage'
import UsersPage from '../../pages/UsersPage'
import DashboardPage from '../../pages/DashboardPage'
import ProfilePage from '../../pages/ProfilePage'
import LoginFormPage from '../../pages/LoginPage'
import LandingPage from '../../pages/LandingPage'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: '56px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    }
  }
})

/**
 * Main content component
 * @returns {*}
 * @constructor
 */
function Main({ classes }) {
  return (
    <main className={classes.root}>
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
        <Route path="/login" component={LoginFormPage} />
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <ProtectedRoute path="/users" component={UsersPage} />
        <ProtectedRoute path="/clients" component={ClientPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </main>
  )
}

/**
 * Property type check
 * @type {Object}
 */
Main.propTypes = {
  /**
   * Classes to extend style
   * @private
   */
  classes: PropTypes.object.isRequired
}

// Inject styles
export default withStyles(styles)(Main)
