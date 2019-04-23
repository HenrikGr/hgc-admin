/**
 * @prettier
 * @description: App
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

// material-ui
import withTheme from './view/theme/withTheme'

// Layout components
import DefaultLayout from './view/layout/DefaultLayout'
import AuthenticatedLayout from './view/layout/AuthenticatedLayout'

import SessionProvider from './view/providers/SessionProvider'
import withAsyncImport from './view/hoc/withAsyncImport'

const AsyncLandingPage = withAsyncImport(() => import('./view/pages/LandingPage'))
const AsyncLoginPage = withAsyncImport(() => import('./view/pages/LoginPage'))
const AsyncDashboardPage = withAsyncImport(() => import('./view/pages/DashboardPage'))
const AsyncProfilePage = withAsyncImport(() => import('./view/pages/ProfilePage'))
const AsyncUsersPage = withAsyncImport(() => import('./view/pages/UsersPage'))
const AsyncClientPage = withAsyncImport(() => import('./view/pages/ClientPage'))
const AsyncNotFoundPage = withAsyncImport(() => import('./view/pages/NotFound'))

/**
 * App component
 * @returns {*}
 * @constructor
 */
const App = () => (
  <Provider store={store}>
    <SessionProvider>
      <Router>
        <Switch>
          <DefaultLayout exact={true} path="/" component={AsyncLandingPage} />
          <DefaultLayout path="/login" component={AsyncLoginPage} />
          <AuthenticatedLayout path="/dashboard" component={AsyncDashboardPage} />
          <AuthenticatedLayout path="/profile" component={AsyncProfilePage} />
          <AuthenticatedLayout path="/users" component={AsyncUsersPage} />
          <AuthenticatedLayout path="/clients" component={AsyncClientPage} />
          <AuthenticatedLayout path="*" component={AsyncNotFoundPage} />
        </Switch>
      </Router>
    </SessionProvider>
  </Provider>
)

// Inject material-ui theme
export default withTheme(App)
