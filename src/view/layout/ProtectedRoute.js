/**
 * Description: Application module
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react & router
import React from "react";
import { Route, Redirect } from "react-router-dom";

// global store
import store from "../../store";

// helper
import {isEmpty} from "../../utils/helper";


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
const ProtectedRoute = ({ component: Component, ...rest }) => (
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

export default ProtectedRoute;