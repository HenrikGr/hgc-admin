/**
 * Description: ApplicationLayout component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & React Router
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Material ui
import { withStyles } from "@material-ui/core/styles";

// custom components
import NavigationBar from './NavigationBar';
import Main from './Main';

// Session actions
import sessionActions from "../../store/actions/SessionAction";

// Component styles
const styles = {
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
};

/**
 * Application layout component
 * @param {object} classes - style object used by material-ui withStyle HOC
 * @param {object} token - token if user is authenticated
 * @param {function} removeSession - function to remove session with token
 * @param {function} refreshSession - used to refresh token when expired
 * @returns {*}
 * @constructor
 */
function AppLayout({ classes, token, removeSession, refreshSession }) {
  return(
    <div className={classes.root}>
      <NavigationBar
        token={ token }
        removeSession={ removeSession }
        refreshSession={ refreshSession }
      />
      <Main/>
    </div>
  )
}

/**
 * Props API
 * @type {{classes: *, token: *, removeSession: *, refreshSession: *}}
 */
AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  removeSession: PropTypes.func.isRequired,
  refreshSession: PropTypes.func.isRequired,
};

/**
 * Map token state to props
 * @param {object} state - global state
 * @returns {{token: (defaults.session.token|{})}}
 */
const mapStateToProps = state => {
  return {
    token: state.session.token,
  };
};

/**
 * Map session actions to props
 * @param {function} dispatch - function used to dispatch actions
 * @returns {{removeSession: removeSession, refreshSession: refreshSession}}
 */
const mapDispatchToProps = dispatch => {
  return {
    removeSession: () => {
      dispatch(sessionActions.removeSession());
    },
    refreshSession: () => {
      dispatch(sessionActions.refreshSession());
    }
  };
};

// Inject state, actions and styles to component
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppLayout));