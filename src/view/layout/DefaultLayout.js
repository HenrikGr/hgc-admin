/**
 * @prettier
 * @description: DefaultLayout component
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Route } from 'react-router-dom'

// material-ui
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/core/styles'

// custom components
import Notification from '../components/notification/Notification'
import LinearProgressbar from '../components/progress/LinearProgressbar'
import Header from '../components/header/Header'

/**
 * Custom styles
 * @type {{container: {marginTop: string}}}
 */
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
      render={({ staticContext, ...matchProps }) => {
        return (
          <React.Fragment>
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
          </React.Fragment>
        )
      }}
    />
  )
}

export default withStyles(styles)(DefaultLayout)
