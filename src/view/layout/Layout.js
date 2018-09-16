/**
 * @prettier
 * @description: Layout component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'

// Material ui
import Grid from '@material-ui/core/Grid'

// Custom components
import Header from '../components/header/Header'
import LinearProgressbar from '../components/progress/LinearProgressbar'
import Notification from '../components/notification/Notification'

// Render content layout component
import RenderContent from './RenderContent'

// User provider
import UserProvider from '../providers/UserProvider'

/**
 * Layout component
 * @returns {*}
 * @constructor
 */
function Layout() {
  return (
    <Grid container spacing={0}>
      <UserProvider>
        <Grid item xs={12}>
          <Notification />
          <LinearProgressbar />
        </Grid>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} container spacing={0}>
          <RenderContent />
        </Grid>
      </UserProvider>
    </Grid>
  )
}

export default Layout
