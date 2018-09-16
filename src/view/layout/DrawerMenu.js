/**
 * @prettier
 * @description: DrawerMenu component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-uid
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import DraftsIcon from '@material-ui/icons/Drafts'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { withStyles } from '@material-ui/core/styles'
import { ListItemLink } from '../components/links/index'

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100vh' // 100% of the viewport height
  },
  toolbar: theme.mixins.toolbar,
  list: {
    backgroundColor: theme.palette.background.paper
  }
})

/**
 * DrawerMenu component
 * @param classes
 * @returns {*}
 * @constructor
 */
function DrawerMenu({ classes }) {
  return (
    <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <div className={classes.toolbar} />
      <List className={classes.list} component="nav">
        <ListItemLink to="/dashboard" primary="Dashboard" icon={<DashboardIcon />} />
        <ListItemLink to="/users" primary="Users" icon={<PeopleIcon />} />
        <ListItemLink to="/clients" primary="Clients" icon={<DraftsIcon />} />
        <ListItemLink to="/tokens" primary="Tokens" icon={<BookmarkIcon />} />
      </List>
    </Drawer>
  )
}

/**
 * Property type check
 * @type {Object}
 */
DrawerMenu.propTypes = {
  /**
   * Classes to extend the style of the component
   * @private
   */
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DrawerMenu)
