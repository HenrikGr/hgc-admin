/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & React Router
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// material-ui global resets
import withRoot from '../src/components/withRoot';

// Pages
import IndexPage from './pages/IndexPage'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import LoginFormPage from './pages/LoginFormPage'

// application state
import store from '../src/modules/state/store'
import { isEmpty } from '../src/modules/utils/helper'

/**
 * Protected route handler
 * NOTE: We do an assumption that Redux state will contain a
 * user object for the current user. We do check if the user object
 * is empty and assumes the user is not authenticated if so.
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    !isEmpty(store.getState().session) ? (
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
      <Route path="/login" component={LoginFormPage}/>
      <PrivateRoute path="/dashboard" component={DashboardPage}/>
    </div>
  </Router>
);

// Export Index page component wrapped with root settings
export default withRoot(App);

