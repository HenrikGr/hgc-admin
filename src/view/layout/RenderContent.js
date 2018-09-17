/**
 * @prettier
 * @description: RenderContent component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'

// material-ui
import Grid from '@material-ui/core/Grid/Grid'
import { withStyles } from '@material-ui/core/styles'

// Content components
import DrawerMenu from './DrawerMenu'
import Main from './Main'

// User context
import { withUserState } from '../providers/withUserContext'

const styles = theme => ({
  toolbar: theme.mixins.toolbar
})

/**
 * RenderContent component
 * @param {object} classes
 * @param {object} context - user context
 * @returns {*}
 * @constructor
 * @public
 */
function RenderContent({ classes, context }) {
  return context.isAuth ? (
    <React.Fragment>
      <Grid component="nav" item xs={2}>
        <DrawerMenu />
      </Grid>
      <Grid component="main" item xs={10}>
        <div className={classes.toolbar} />
        <Main />
      </Grid>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Grid component="main" item xs={12}>
        <div className={classes.toolbar} />
        <Main />
      </Grid>
    </React.Fragment>
  )
}

// Inject styles
export default withStyles(styles)(withUserState(RenderContent))
