/**
 * Description
 *
 * The Header component renders the application header that will contain
 * a login button or a personal profile menu for the authenticated user
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
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles';

const styles = {
  button: {
    margin: 8,
  }
};

/**
 * LoginButton
 * @param props
 * @returns {*}
 * @constructor
 */
function LoginButton(props) {
  return(
    <Button
      component={ Link }
      to='/login'
      variant="raised"
      color="secondary"
      className={ props.classes.button }
    >
      Login
    </Button>
  );
}

/**
 * Component props API
 * @type {{isAuthenticated, classes}}
 */
LoginButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

// Inject classes to the component
export default withStyles(styles)(LoginButton)