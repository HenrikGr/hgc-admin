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

// material-ui components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

// custom components
import HeaderMenu from "./HeaderMenu";
import HeaderIcon from './HeaderIcon';
import SessionTimeout from "./SessionTimeout";
import RefreshSessionDialog from "./RefreshSessionDialog";

// component styles
const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    flex: 1
  },
  homeBtn: {
    marginLeft: -12,
    marginRight: 20
  }
});

/**
 * Header component
 */
class Header extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes, can be used to override css styles
     */
    classes: PropTypes.object.isRequired,
    /**
     * Title
     */
    title: PropTypes.string.isRequired,
    /**
     * Flag that indicate if user is authenticated or not
     */
    isAuth: PropTypes.bool.isRequired,
    /**
     * Duration of the session token if user is authenticated
     */
    duration: PropTypes.number.isRequired,
    /**
     * Function to remove session, i.e logging out.
     */
    removeSession: PropTypes.func.isRequired,
    /**
     * Function to extend session after duration has elapsed
     */
    refreshSession: PropTypes.func.isRequired
  };

  /**
   * Default props
   */
  static defaultProps = {
    /**
     * Default title, uses env variables
     */
    title: "HGC AB - " + process.env.NODE_ENV
  };

  /**
   * Event handler for logout
   */
  handleLogOut = () => {
    this.props.removeSession();
  };

  /**
   * Event handler for extend the session after token has expired
   */
  handleRefresh = () => {
    this.props.refreshSession();
  };

  /**
   * Event handler to deal with result of refresh dialog
   * @param action
   */
  handleDialogCLose = action => {
    if (action === "logout") {
      this.handleLogOut();
    } else {
      this.handleRefresh();
    }
  };

  render() {
    const {
      classes,
      title,
      isAuth,
      duration
    } = this.props;

    return (
      <AppBar
        classes={{ root: classes.root }}
        position="fixed"
      >
        <Toolbar>
          <HeaderIcon
            isAuth={ isAuth }
          />
          <Typography
            variant="title"
            color="inherit"
            className={ classes.title }
          >
            {title}
          </Typography>
          <SessionTimeout
            duration={ duration }
            onStopped={ this.handleLogOut }
            render={({ started, refresh }) => {
              return (
                <React.Fragment>
                  <RefreshSessionDialog
                    onClose={ this.handleDialogCLose }
                    open={ refresh }
                  />
                  <HeaderMenu
                    isAuth={ started }
                    onLogout={ this.handleLogOut } />
                </React.Fragment>
              );
            }}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
