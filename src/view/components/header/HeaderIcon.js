/**
 * Description: Header component
 *
 * The component display a header which contains a home icon, title, and
 * login button or a menu depending on if the user is authenticated or not.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// material-ui components
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  icon: {
    marginLeft: -12,
    marginRight: 20
  },
};

/**
 * HeaderIcon
 * @param classes
 * @param isAuth
 * @returns {*}
 * @constructor
 */
function HeaderIcon({ classes, isAuth }) {
  return(
    <IconButton
      className={ classes.icon }
      component={ Link }
      to={ isAuth ? "/dashboard" : "/" }
      color="inherit"
      aria-label="Menu"
    >
      <MenuIcon />
    </IconButton>
  );
}

/**
 * Props API
 */
HeaderIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

// Inject styles
export default withStyles(styles)(HeaderIcon);

