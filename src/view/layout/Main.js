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
import { Route, Switch, Redirect } from "react-router-dom";

// Content pages
import NotFoundPage from "../pages/NotFound";
import ClientPage from "../pages/ClientPage";
import UsersPage from "../pages/UsersPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import LoginFormPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";

// Material ui
import { withStyles } from "@material-ui/core/styles";
import store from "../../store";
import { isEmpty } from "../../utils/helper";

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    marginTop: "56px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "64px"
    }
  }
});

/**
 * Protected route handler
 * NOTE: We do an assumption that Redux state will contain a
 * session object for the current user. We do check if the token
 * object of the session is empty and assumes the user is not
 * authenticated if so.
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props => {
      const { token } = store.getState().session;
      return( !isEmpty(token) ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: "/login", state: { from: props.location }}} />)
      )
    }}
  />
);

/**
 * Main component
 * @param classes
 * @returns {*}
 * @constructor
 */
function Main({ classes }) {
  return(
    <main className={classes.content}>
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
        <Route path="/login" component={LoginFormPage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/users" component={UsersPage} />
        <PrivateRoute path="/clients" component={ClientPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </main>
  )
}

export default withStyles(styles)(Main);