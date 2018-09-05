/**
 * @prettier
 * @description: NavigationBar component containing the following:
 * - RefreshSessionDialog, a modal dialog that consumes the AuthProvider context to
 *   provide a means for the user to extends the session or logout.
 * - Header, a component rendering the application header
 * - DrawerMenu, a component using the AuthProvider context to open a menu drawer if authenticated
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import Header from '../../components/header/Header'
import DrawerMenu from '../../components/drawers/DrawerMenu'

/**
 * NavigationBar
 * @returns {*}
 * @constructor
 */
function NavigationBar() {
  return (
    <React.Fragment>
      <Header />
      <DrawerMenu />
    </React.Fragment>
  )
}

export default NavigationBar
