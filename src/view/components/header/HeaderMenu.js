/**
 * @prettier
 * @description: HeaderMenu container component
 *
 * The component is dependent on the user context and if the user is authenticated
 * or not it renders a login button or a menu.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { LogInLink, ProfileLink, HomeLink } from '../links'

// Consume session context
import withSessionContext from '../../providers/withSessionContext'

/**
 * HeaderMenu component
 * @class HeaderMenu
 * @public
 */
class HeaderMenu extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    /**
     * Store context from the user provider
     * @private
     */
    context: PropTypes.object.isRequired
  }

  state = {
    anchorEl: null // HTMLElement from the IconButton
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleLogout = () => {
    this.props.context.logOut()
  }

  render() {
    const { context } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return !context.isAuth ? (
      <Button
        component={LogInLink}
        variant="contained"
        color="secondary"
      >
        Login
      </Button>
    ) : (
      <React.Fragment>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem component={ProfileLink} onClick={this.handleClose}>
            Profile
          </MenuItem>
          <Divider />
          <MenuItem component={HomeLink} onClick={this.handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    )
  }
}

export default withSessionContext(HeaderMenu)
