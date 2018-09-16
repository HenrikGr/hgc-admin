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

// Content components
import DrawerMenu from './DrawerMenu'
import Main from './Main'

// User context
import { withUserState } from '../providers/withUserContext'

/**
 * RenderContent component
 * @param {object} context - user context
 * @returns {*}
 * @constructor
 * @public
 */
function RenderContent({ context }) {
  return context.isAuth ? (
    <React.Fragment>
      <Grid item xs={2}>
        <DrawerMenu />
      </Grid>
      <Grid item xs={10}>
        <Main />
      </Grid>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Grid item xs={12}>
        <Main />
      </Grid>
    </React.Fragment>
  )
}

// Inject styles
export default withUserState(RenderContent)
