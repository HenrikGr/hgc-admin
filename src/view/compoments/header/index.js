/**
 * Description: Header component
 *
 * The component display a header which contains a home icon, title, and
 * login button or a menu depending on if the user is authenticated or not.
 *
 * The component session state trough props, supply changes to the the presentation layer
 * and update states to the store.
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
import { connect } from "react-redux";

// material-ui components
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

// custom components
import SessionTimeout from "./SessionTimeout";
import AuthMenu from "./AuthMenu";
import RefreshSessionDialog from "./RefreshSessionDialog";

// Action creator for the session store
import sessionStore from "../../../store/actions/SessionAction";

const styles = {
  root: {
    width: "100%",
    marginBottom: 64 // We are using fixed header
  },
  flex: {
    flex: 1
  },
  button: {
    marginLeft: -12,
    marginRight: 20
  },
  marginRight: {
    marginRight: "24px"
  }
};

/**
 * Header component
 */
class Header extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Title
     */
    title: PropTypes.string.isRequired,

    /**
     * Classes, can be used to override css styles
     */
    classes: PropTypes.object.isRequired,

    /**
     * Session object from global state
     */
    session: PropTypes.object.isRequired,

    /**
     * Function to remove session, i.e logging out.
     */
    removeSession: PropTypes.func.isRequired,

    /**
     * Function to extend session
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
   * Handle logout
   */
  handleLogOut = () => {
    const { removeSession } = this.props;
    if (typeof removeSession === "function") {
      removeSession();
    }
  };

  /**
   * Handle refresh session to extend the session for the user
   */
  handleRefresh = () => {
    const { refreshSession } = this.props;
    if (typeof refreshSession === "function") {
      refreshSession();
    }
  };

  /**
   * Handle refresh dialog choices on close
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
    const { classes, title, session } = this.props;
    const { expires_in } = session;
    const expiresIn = expires_in ? expires_in : 0;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              component={Link}
              to={expiresIn > 0 ? "/dashboard" : "/"}
              className={classes.button}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {title}
            </Typography>
            <SessionTimeout
              duration={expiresIn}
              onStop={this.handleLogOut}
              render={({ started, refresh }) => {
                return (
                  <div>
                    <RefreshSessionDialog
                      onClose={this.handleDialogCLose}
                      open={refresh}
                    />
                    <AuthMenu isAuth={started} onLogout={this.handleLogOut} />
                  </div>
                );
              }}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// Map session state to props
const mapStateToProps = state => {
  return {
    session: state.session
  };
};

// Map session action creators as props
const mapDispatchToProps = dispatch => {
  return {
    removeSession: () => {
      dispatch(sessionStore.removeSession());
    },
    refreshSession: () => {
      dispatch(sessionStore.refreshSession());
    }
  };
};

// Inject state and action creators to the session component
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
