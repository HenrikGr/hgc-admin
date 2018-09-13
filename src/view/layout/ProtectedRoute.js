/**
 * @prettier
 * @description: PrivateRoute component used for protected routes
 *
 * The component consumes the user state context provided by
 * the higher order component withUserState
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// global store
import store from '../../store'

// helper
import { isEmpty } from '../../utils/helper'

/**
 * Protected route handler
 * @param Component
 * @param context
 * @param rest
 * @returns {*}
 * @constructor
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { token } = store.getState().user
      return !isEmpty(token) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }}
  />
)

export default ProtectedRoute
