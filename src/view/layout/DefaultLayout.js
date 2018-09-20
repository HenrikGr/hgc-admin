/**
 * @prettier
 * @description: Layouts module
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

// material-ui
import Grid from '@material-ui/core/Grid/Grid'

// custom components
import Notification from '../components/notification/Notification'
import LinearProgressbar from '../components/progress/LinearProgressbar'
import Header from '../components/header/Header'
import DrawerMenu from './DrawerMenu'

// Global store
import store from '../../store'

// User provider
import UserProvider from '../providers/UserProvider'

/**
 * Authenticated layout
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
export const AuthenticatedLayout = ({ component: Component, ...rest }) => {
  const { isAuth } = store.getState().user
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

/**
 * Default layout
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => {
        return (
          <UserProvider>
            <Grid container spacing={0}>
              <Notification />
              <LinearProgressbar />
              <Header />
              <Grid component="main" item xs={12} container spacing={0}>
                <Component {...matchProps} />
              </Grid>
            </Grid>
          </UserProvider>
        )
      }}
    />
  )
}

export default DefaultLayout
