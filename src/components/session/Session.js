/**
 * Description
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Import ui components for session states
import LoginButton from "./LoginButton";
import MenuButton from "./MenuButton";
import RefreshSession from "./RefreshSession";

import {
  removeAccessToken,
  refreshAccessToken
} from "../../modules/state/actions/session";

/**
 * Session component
 */
class Session extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    removeSession: PropTypes.func.isRequired,
    refreshSession: PropTypes.func.isRequired
  };

  static defaultProps = {
    session: {}
  };

  state = {
    started: false,
    refresh: false,
    redirectToLogin: false
  };

  expiresIn = -1;
  granularity = 1000; // 1 second
  refreshThreshold = 5 * 60; // 5 minutes
  timerID = null;

  componentWillReceiveProps(nextProps, nextContext) {
    const { expires_in } = nextProps.session;

    if (expires_in && !this.state.started) {
      this.expiresIn = expires_in;
      this.setState({ started: true, refresh: false }, () => {
        this.timerID = setInterval(() => this.tick(), this.granularity);
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick = () => {
    switch (this.expiresIn) {
      case this.refreshThreshold:
        this.setState({ refresh: true }, () => {
          this.expiresIn = this.expiresIn - 1;
        });
        break;

      case 0:
        this.logout();
        break;

      default:
        this.expiresIn = this.expiresIn - 1;
        break;
    }
  };

  refresh = () => {
    clearInterval(this.timerID);
    this.expiresIn = -1;
    this.setState({ started: false }, () => {
      this.props.refreshSession();
    });
  };

  logout = () => {
    clearInterval(this.timerID);
    this.expiresIn = -1;
    this.setState(
      { refresh: false, started: false, redirectToLogin: true },
      () => {
        this.props.removeSession();
      }
    );
  };

  handleDialog = action => {
    if (action === "logout") {
      this.logout();
    } else {
      this.refresh();
    }
  };

  render() {
    return (
      <div>
        <RefreshSession onClose={this.handleDialog} open={this.state.refresh} />
        {this.state.started || this.state.refresh ? (
          <MenuButton onLogout={this.logout} />
        ) : (
          <LoginButton />
        )}
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
      dispatch(removeAccessToken());
    },
    refreshSession: () => {
      dispatch(refreshAccessToken());
    }
  };
};

// Inject state and action creators to the session component
const SessionWithState = connect(mapStateToProps, mapDispatchToProps)(Session);
export default SessionWithState;
