/**
 * Description: AuthProvider
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// AuthContext singleton
import AuthContext from './AuthContext';

// Session actions
import sessionActions from "../../store/actions/SessionAction";

/**
 * AuthProvider that update the context based on token prop changes
 */
class AuthProvider extends React.Component {
  static propTypes = {
    token: PropTypes.object.isRequired,
    granularity: PropTypes.number.isRequired,
    refreshThreshold: PropTypes.number.isRequired,
    removeThreshold: PropTypes.number.isRequired,
  };

  static defaultProps = {
    token: {},
    granularity: 1000, // 1 second
    refreshThreshold: 50, // 2 minutes
    removeThreshold: 30, // 30 seconds
  };

  /**
   * Initial state
   */
  state = {
    isAuth: false,
    duration: 0,
    openSessionDlg: false,
  };

  timerID = 0;
  duration = 0;

  componentDidUpdate(prevProps, prevState) {
    const { token, granularity, removeThreshold } = this.props;

    if (token !== prevProps.token) {
      const { expires_in } = token;
      const duration = expires_in ? expires_in : 0; // no token = 0

      // Start timer to set isAuth, duration and kick off timer
      if (duration > removeThreshold && !prevState.isAuth) {
        this.startTimer(duration, granularity)
      }

      // Restart timer if new token received
      if (duration > prevState.duration && prevState.isAuth) {
        this.startTimer(duration, granularity)
      }

      // Stop timer and set isAuth to false when session expired
      if (duration === 0 && prevState.isAuth) {
        this.stopTimer()
      }
    }

    // Check if duration has been counted down to the removeThreshold
    if (prevState.duration === removeThreshold) {
      this.handleRemoveSession();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  handleRefreshSession = () => {
    this.props.refreshSession();
  };

  handleRemoveSession = () => {
    this.props.removeSession();
  };

  startTimer = (duration, granularity) => {
    if (this.timerID) {
      clearTimeout(this.timerID);
      this.timerID = 0;
    }

    this.setState(state => {
      this.timerID = setInterval(() => this.tick(), granularity);
      return {
        ...state,
        isAuth: true,
        duration: duration,
        openSessionDlg: false,
      }
    });
  };

  stopTimer = () => {
    if (this.timerID) {
      clearTimeout(this.timerID);
      this.timerID = 0;
    }

    this.setState(state => {
      return {
        ...state,
        isAuth: false,
        duration: 0,
        openSessionDlg: false,
      }
    });
  };

  refreshState = () => {
    this.setState(state => {
      return {
        ...state,
        duration: state.duration - 1,
        openSessionDlg: true,
      }
    });
  };

  countDown = () => {
    this.setState(state => {
      return {
        ...state,
        duration: state.duration - 1,
      }
    });
  };

  tick = () => {
    switch (this.state.duration) {
      case this.props.refreshThreshold:
        this.refreshState();
        break;

      case 0:
        this.stopTimer();
        break;

      default:
        this.countDown();
        break;
    }
  };

  render() {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        refreshSession: this.handleRefreshSession,
        removeSession: this.handleRemoveSession,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

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


export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);
