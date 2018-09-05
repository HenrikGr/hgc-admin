/**
 * Description: DrawerMenu component
 *
 * A permanent drawer component that renders if user is authenticated. Using
 * AuthProvider context to check if user is authenticated or not.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React
import React from 'react';
import PropTypes from 'prop-types';

// material-uid
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People'
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkIcon from '@material-ui/icons/Bookmark'
import { withStyles } from '@material-ui/core/styles';

// Auth context HOC
import { withUserAuth } from '../../providers/withUserContext'

// custom links
import { ListItemLink } from "../links/index";


const styles = theme => ({
  drawerPaper: {
    position: "relative",
    width: "240px",
    height: "100vh" // 100% of the viewport height
  },
  toolbar: theme.mixins.toolbar,
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

/**
 * DrawerMenu component
 * @param classes
 * @param isAuth
 * @returns {*}
 * @constructor
 */
function DrawerMenu({ classes, isAuth }) {
  return ( isAuth ? (
    <Drawer
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={ classes.toolbar } />
      <List className={ classes.list } component="nav">
        <ListItemLink to="/dashboard" primary="Dashboard" icon={ <DashboardIcon />} />
        <ListItemLink to="/users" primary="Users" icon={ <PeopleIcon />} />
        <ListItemLink to="/clients" primary="Clients" icon={ <DraftsIcon />} />
        <ListItemLink to="/tokens" primary="Tokens" icon={ <BookmarkIcon />} />
      </List>
    </Drawer>
  ) :
    null
  );
}

/**
 * Props API
 */
DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default withUserAuth(withStyles(styles)(DrawerMenu));