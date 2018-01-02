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
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles';

// Component styles
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
      raised
      color="accent"
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


export default withStyles(styles)(LoginButton)