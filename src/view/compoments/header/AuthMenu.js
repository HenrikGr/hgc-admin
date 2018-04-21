/**
 * Description
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & Router
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// material-ui
import Menu, { MenuItem } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import MoreVert from "material-ui-icons/MoreVert";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

const styles = {
  button: {
    margin: 8
  }
};

/**
 * MenuButton component
 */
class AuthMenu extends Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes, can be used to override css styles
     */
    classes: PropTypes.object.isRequired,

    /**
     * Boolean flag indicating if user is authenticated or not
     */
    isAuth: PropTypes.bool.isRequired,

    /**
     * Callback function to be called if user logs out.
     */
    onLogout: PropTypes.func.isRequired
  };

  /**
   * Initial state
   */
  state = {
    anchorEl: null // HTMLElement from the IconButton
  };

  /**
   * onClick event handler for the IconButton component
   * Sets the anchorEl to the HTMLElement of the IconButton
   * and thus ensure the open flag will be tru on next render
   * @param event
   */
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * Event handler responsible for closing the menu.
   * Sets the anchorEl to null to enforce the open flag to be false
   * on next render
   * @param event
   */
  handleClose = event => {
    this.setState({ anchorEl: null });
  };

  /**
   * Event handler function when user logs out
   * @param event
   */
  handleLogOut = event => {
    const { onLogout } = this.props;
    if (onLogout) {
      onLogout();
    }
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, isAuth } = this.props;

    // Set the open flag
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        { !isAuth ? (
          <Button
            component={ Link }
            to="/login"
            variant="raised"
            color="secondary"
            className={ classes.button }
          >
            Login
          </Button>
        ) : (
          <div>
            <IconButton
              aria-owns={ open ? "menu-appbar" : null }
              aria-haspopup="true"
              onClick={ this.handleClick }
              color="inherit"
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={ anchorEl }
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={ open }
              onClose={ this.handleClose }
            >
              <MenuItem
                component={ Link }
                to="/profile"
                onClick={ this.handleClose }
              >
                Profile
              </MenuItem>
              <MenuItem
                component={ Link }
                to="/users"
                onClick={ this.handleClose }
              >
                Users
              </MenuItem>
              <MenuItem
                component={ Link }
                to="/login"
                onClick={ this.handleLogOut }
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AuthMenu);
