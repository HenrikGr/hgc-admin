/**
 * Description: HeaderMenu component
 *
 * The component render either a login button or a menu dependent on if the user
 * is authenticated or not.
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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  button: {
    margin: 8
  }
};

/**
 * HeaderMenu component
 */
class HeaderMenu extends Component {
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
   * and thus ensure the open flag will be true on next render
   * @param event
   */
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * Event handler responsible for closing the menu.
   * Sets the anchorEl to null to enforce the open flag to be false
   * on next render
   */
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  /**
   * Event handler function when user logs out
   */
  handleLogOut = () => {
    this.props.onLogout();
    this.handleClose();
  };

  render() {
    const { classes, isAuth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        { !isAuth ? (
          <Button
            className={ classes.button }
            component={ Link }
            to="/login"
            variant="raised"
            color="secondary"
          >
            Login
          </Button>
        ) : (
          <React.Fragment>
            <IconButton
              aria-owns={ open ? "menu-appbar" : null }
              aria-haspopup="true"
              onClick={ this.handleClick }
              color="inherit"
            >
              <AccountCircle />
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
              <Divider />
              <MenuItem
                component={ Link }
                to="/login"
                onClick={ this.handleLogOut }
              >
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(HeaderMenu);
