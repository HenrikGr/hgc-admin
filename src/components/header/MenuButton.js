/**
 * Description
 *
 * The menu-button component does not have any properties,
 * instead it handles the local state to clicks.
 *
 * The event handler handleMenu is responsible for open the
 * menu and the handleRequestClose is responsible for closing.
 *
 * The MenuItem components is rendered as links and will route
 * the client.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */
// React & Router
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// material-ui components
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui-icons/MoreVert';

/**
 * MenuButton component
 */
export default class MenuButton extends Component {

  state = {
    anchorEl: null, // HTMLElement from the IconButton
  };

  /**
   * onClick event handler for the IconButton component
   * Sets the anchorEl to the HTMLElement of the IconButton
   * and thus ensure the open flag will be tru on next render
   * @param event
   */
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  /**
   * Event handler responsible for closing the menu.
   * Sets the anchorEl to null to enforce the open flag to be false
   * on next render
   */
  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    // Set the open flag
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return(
      <div>
        <IconButton
          aria-owns={ open ? 'menu-appbar' : null }
          aria-haspopup="true"
          onClick={ this.handleMenu }
          color="inherit"
        >
          <MoreVert/>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={ anchorEl }
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={ open }
          onClose={ this.handleRequestClose }
        >
          <MenuItem
            component={ Link }
            to='/profile'
            onClick={ this.handleRequestClose }
          >
            Profile
          </MenuItem>
          <MenuItem
            component={ Link }
            to='/logout'
            onClick={ this.handleRequestClose }
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  }
}