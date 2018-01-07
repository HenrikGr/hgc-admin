/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

// React & React Router
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// material-ui global resets
import withRoot from '../src/components/withRoot';

// Pages
import IndexPage from '../src/pages/index'
import LandingPage from '../src/pages/landing'
import DashboardPage from '../src/pages/dashboard'
import LoginPage from '../src/pages/login'
import RegisterUser from './pages/register-user'
import ContactsPage from '../src/pages/contacts'
import AccountPage from '../src/pages/account'

// application state
import store from '../src/modules/state/store'
import { isEmpty } from '../src/modules/utils/helper'

/**
 * Protected route handler
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !isEmpty(store.getState().userId) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

/**
 * Index page component
 * @returns {*}
 * @constructor
 */
const App = () => (
  <Router>
    <div>
      <IndexPage/>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/register-user" component={RegisterUser}/>
      <Route path="/login" component={LoginPage}/>
      <Route path="/contacts" component={ContactsPage}/>
      <Route path="/account" component={AccountPage}/>
      <PrivateRoute path="/dashboard" component={DashboardPage}/>
    </div>
  </Router>
);

// Export Index page component wrapped with root settings
export default withRoot(App);

