/**
 * @prettier
 * @description: AuthenticatedLayout
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Redirect } from 'react-router-dom'

// material-ui
import Grid from '@material-ui/core/Grid/Grid'

// custom components
import DefaultLayout from '../layout/DefaultLayout'
import DrawerMenu from './DrawerMenu'

// Global store
import store from '../../store'

/**
 * Authenticated layout
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const AuthenticatedLayout = ({ component: Component, ...rest }) => {
  const { isAuth } = store.getState().session
  return (
    <DefaultLayout
      {...rest}
      component={matchProps => {
        return isAuth ? (
          <React.Fragment>
            <Grid component="nav" item xs={2}>
              <DrawerMenu />
            </Grid>
            <Grid component="article" item xs={10}>
              <Component {...matchProps} />
            </Grid>
          </React.Fragment>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: matchProps.location } }} />
        )
      }}
    />
  )
}

export default AuthenticatedLayout
