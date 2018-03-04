/**
 * Description: The Header component renders the application header
 * that will contain a login button or a personal profile menu for
 * the authenticated user
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & Router
import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

// material-ui
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';

const styles = {
  button: {
    marginLeft: -12,
    marginRight: 20,
  },
};

/**
 * IconButton component that routes to / if not authenticated
 * or /dashboard if authenticated.
 * @param isAuth
 * @param classes
 * @returns {*}
 * @constructor
 */
function HomeButton({ isAuth, classes }) {
  return(
    <IconButton
      component={ Link }
      to={ isAuth ? '/dashboard' : '/'}
      className={ classes.button }
      color="inherit"
      aria-label="Menu"
    >
      <MenuIcon />
    </IconButton>
  );
}

/**
 * Component props API
 * @type {{isAuth, classes}}
 */
HomeButton.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

// Inject classes to the component
export default withStyles(styles)(HomeButton);