/**
 * Description: NavigationBar
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

// custom components
import Header from "../components/header/Header";
import DrawerMenu from "./DrawerMenu";

// Session actions
import sessionActions from "../../store/actions/SessionAction";

/**
 * NavigationBar
 * @param {object} token - token if user is authenticated
 * @param {function} removeSession - function to remove session with token
 * @param {function} refreshSession - used to refresh token when expired
 * @returns {*}
 * @constructor
 */
function NavigationBar({ token, removeSession, refreshSession }) {
  const { expires_in } = token;
  const expiresIn = expires_in ? expires_in : 0; // no token = 0

  return(
    <React.Fragment>
      <Header
        isAuth={ expiresIn > 0 }
        duration={ expiresIn }
        refreshSession={ refreshSession }
        removeSession={ removeSession }
      />
      { expiresIn > 0 && (<DrawerMenu />)}
    </React.Fragment>
  )
}

NavigationBar.propTypes = {
  token: PropTypes.object.isRequired,
  removeSession: PropTypes.func.isRequired,
  refreshSession: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    token: state.session.token,
  };
};

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

// Inject global state and styles
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);