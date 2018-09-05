/**
 * @prettier
 * @description: PrivateRoute component used for protected routes
 * The component checks if the isAuth boolean flag is NOT set in
 * and then re-direct the user to the login route
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { withUserAuth } from '../providers/withUserContext'

/**
 * Protected route handler
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return !props.isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }}
  />
)

export default withUserAuth(ProtectedRoute)
