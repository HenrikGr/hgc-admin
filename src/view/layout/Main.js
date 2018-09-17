/**
 * @prettier
 * @description: Main component that renders different content pages
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// custom route handler for protected routes
import ProtectedRoute from './ProtectedRoute'

// Content pages
import NotFoundPage from '../pages/NotFound'
import ClientPage from '../pages/ClientPage'
import UsersPage from '../pages/UsersPage'
import DashboardPage from '../pages/DashboardPage'
import ProfilePage from '../pages/ProfilePage'
import LoginFormPage from '../pages/LoginPage'
import LandingPage from '../pages/LandingPage'

/**
 * Main content component
 * @returns {*}
 * @constructor
 */
function Main() {
  return (
    <Switch>
      <Route exact={true} path="/" component={LandingPage} />
      <Route path="/login" component={LoginFormPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <ProtectedRoute path="/users" component={UsersPage} />
      <ProtectedRoute path="/clients" component={ClientPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  )
}

export default Main
