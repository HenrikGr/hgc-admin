/**
 * Description
 *
 * The Header component renders the application header that will contain
 * a login button or a personal profile menu for the authenticated user
 *
 *
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

// React & Router
import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

// material-ui
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import { withStyles } from 'material-ui/styles';

// Component styles
const styles = {
  button: {
    marginLeft: -12,
    marginRight: 20,
  },
};

/**
 * IconButton component that routes to / if not authenticated
 * or /dashboard if authenticated.
 * @param props
 * @returns {*}
 * @constructor
 */
function HomeButton( props ) {
  return(
    <IconButton
      component={ Link }
      to={props.isAuthenticated ? '/dashboard' : '/'}
      className={ props.classes.button }
      color="contrast"
      aria-label="Menu"
    >
      <MenuIcon />
    </IconButton>
  );
}

/**
 * Component props API
 * @type {{isAuthenticated, classes}}
 */
HomeButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
};

// Module export
export default withStyles(styles)(HomeButton);