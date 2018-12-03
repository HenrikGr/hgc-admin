/**
 * @prettier
 * @description: Layouts module
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import { Route } from 'react-router-dom'

// material-ui
import Grid from '@material-ui/core/Grid/Grid'

// custom components
import Notification from '../components/notification/Notification'
import LinearProgressbar from '../components/progress/LinearProgressbar'
import Header from '../components/header/Header'
import { withStyles } from '@material-ui/core/styles'

// User provider
import UserProvider from '../providers/UserProvider'

const styles = {
  container: {
    marginTop: '64px'
  }
}


/**
 * Default layout
 * @param Component
 * @param classes
 * @param rest
 * @returns {*}
 * @constructor
 */
const DefaultLayout = ({ component: Component, classes, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({staticContext, ...matchProps}) => {
        return (
          <UserProvider>
            <Notification />
            <LinearProgressbar />
            <Header />
            <Grid
              classes={{ container: classes.container }}
              component="main"
              item
              xs={12}
              container
              spacing={0}
            >
              <Component {...matchProps} />
            </Grid>
          </UserProvider>
        )
      }}
    />
  )
}

export default withStyles(styles)(DefaultLayout)
