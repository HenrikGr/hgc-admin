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
import { Route, Switch } from "react-router-dom";

// custom route handler
import ProtectedRoute from './ProtectedRoute';

// material-ui
import { withStyles } from "@material-ui/core/styles";

// Content pages
import NotFoundPage from "../pages/NotFound";
import ClientPage from "../pages/ClientPage";
import UsersPage from "../pages/UsersPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import LoginFormPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";

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
 * Main component
 * @param classes
 * @returns {*}
 * @constructor
 */
function Main({ classes }) {
  return(
    <main className={ classes.content }>
      <Switch>
        <Route exact={true} path="/" component={ LandingPage } />
        <Route path="/login" component={ LoginFormPage } />
        <ProtectedRoute path="/dashboard" component={ DashboardPage } />
        <ProtectedRoute path="/profile" component={ ProfilePage } />
        <ProtectedRoute path="/users" component={ UsersPage } />
        <ProtectedRoute path="/clients" component={ ClientPage } />
        <Route path="*" component={ NotFoundPage } />
      </Switch>
    </main>
  )
}

export default withStyles(styles)(Main);