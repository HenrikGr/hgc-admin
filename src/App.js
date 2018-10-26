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

// material-ui
import withTheme from './view/theme/withTheme'

// Layout components
import DefaultLayout, { AuthenticatedLayout } from './view/layout/DefaultLayout'

/**
 * Async loading components
 * @type {AsyncComponent}
 */
import asyncComponent from './view/layout/AsyncComponent'
const AsyncLandingPage = asyncComponent(() => import('./view/pages/LandingPage'))
const AsyncLoginPage = asyncComponent(() => import('./view/pages/LoginPage'))
const AsyncDashboardPage = asyncComponent(() => import('./view/pages/DashboardPage'))
const AsyncProfile = asyncComponent(() => import('./view/pages/ProfilePage'))
const AsyncUsersPage = asyncComponent(() => import('./view/pages/UsersPage'))
const AsyncClientPage = asyncComponent(() => import('./view/pages/ClientPage'))
const AsyncNotFoundPage = asyncComponent(() => import('./view/pages/NotFound'))

/**
 * App component
 * @param {Object} store - redux global store
 * @constructor
 * @public
 */
const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <DefaultLayout exact={true} path="/" component={AsyncLandingPage} />
        <DefaultLayout path="/login" component={AsyncLoginPage} />
        <AuthenticatedLayout path="/dashboard" component={AsyncDashboardPage} />
        <AuthenticatedLayout path="/profile" component={AsyncProfile} />
        <AuthenticatedLayout path="/users" component={AsyncUsersPage} />
        <AuthenticatedLayout path="/clients" component={AsyncClientPage} />
        <AuthenticatedLayout path="*" component={AsyncNotFoundPage} />
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
