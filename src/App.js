/**
 * @prettier
 * @description: App component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import withTheme from './view/theme/withTheme'

import LandingPage from './view/pages/LandingPage'
import LoginFormPage from './view/pages/LoginPage'
import DashboardPage from './view/pages/DashboardPage'
import ProfilePage from './view/pages/ProfilePage'
import UsersPage from './view/pages/UsersPage'
import ClientPage from './view/pages/ClientPage'
import NotFoundPage from './view/pages/NotFound'

import DefaultLayout, { AuthenticatedLayout } from './view/layout/DefaultLayout'

/**
 * App component that provides the global store
 * @param {Object} store - redux global store
 * @constructor
 * @public
 */
const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <DefaultLayout exact={true} path="/" component={LandingPage} />
        <DefaultLayout path="/login" component={LoginFormPage} />
        <AuthenticatedLayout path="/dashboard" component={DashboardPage} />
        <AuthenticatedLayout path="/profile" component={ProfilePage} />
        <AuthenticatedLayout path="/users" component={UsersPage} />
        <AuthenticatedLayout path="/clients" component={ClientPage} />
        <AuthenticatedLayout path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  </Provider>
)

/**
 * Property type check
 * @type {Object}
 */
App.propTypes = {
  /**
   * redux store
   * @private
   */
  store: PropTypes.object.isRequired
}

// Inject material-ui theme
export default withTheme(App)
