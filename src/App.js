/**
 * Description: Application module
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & React Router
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

// material-ui global resets
import withRoot from "./withRoot";

// Header
import Header from './view/compoments/header'

// Pages
import LandingPage from "./view/pages/LandingPage";
import DashboardPage from "./view/pages/DashboardPage";
import LoginFormPage from "./view/pages/LoginPage";
import ProfileFormPage from "./view/pages/ProfilePage";
import UsersPage from './view/pages/UsersPage';
import NotFoundPage from "./view/pages/NotFound";
import { isEmpty } from "./utils/helper";
import store from './store/index'

/**
 * Protected route handler
 * NOTE: We do an assumption that Redux state will contain a
 * session object for the current user. We do check if the session object
 * is empty and assumes the user is not authenticated if so.
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !isEmpty(store.getState().session) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

/**
 * Application component
 * @returns {*}
 * @constructor
 */
const App = () => (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
        <Route path="/login" component={LoginFormPage} />
        <PrivateRoute path="/profile" component={ProfileFormPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/users" component={UsersPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </React.Fragment>
);

// Inject material ui theme, css baseline, palette etc...
export default withRoot(App);