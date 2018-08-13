/**
 * Description: SessionTimeout component
 *
 * This component will start a timer that counts down until the session
 * is going to time out. The counter method runs against static variables
 * to avoid unnecessary re-renders.
 *
 *  The component uses render prop to expose its internal state which is;
 *  - started, flag indicating if timer started,
 *  - refresh, flag indicating that the session is going to expire
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";

/**
 * SessionTimeout component
 */
class SessionTimeout extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Number of seconds the timer should run when it starts
     * A value bigger than 0 starts the timer.
     */
    duration: PropTypes.number.isRequired,
    /**
     * callback function, can be used to redirect to a login page
     */
    onStopped: PropTypes.func.isRequired,
  };

  /**
   * Initial state
   */
  state = {
    started: false,
    refresh: false
  };

  /**
   * Static props for the timer
   */
  expiresIn = -1;
  granularity = 1000; // 1 second
  refreshThreshold = 60; // 1 minutes
  timerID = null;

  /**
   * Start the timer if duration prop > 0
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.duration !== prevProps.duration) {

      // Stop timer
      if (this.props.duration === 0 && prevState.started) {
        clearInterval(this.timerID);
        this.expiresIn = -1;
        this.setState({ started: false, refresh: false });
      }

      // Start timer
      if (this.props.duration > 0 && !prevState.started) {
        this.expiresIn = this.props.duration;
        this.setState(state => {
          this.timerID = setInterval(() => this.tick(), this.granularity);
          return { ...state, started: true }
        });
      }
    }
  }

  /**
   * Clear timer
   */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * Count down function
   * Function that count down the static variable expiresIn.
   */
  tick = () => {
    switch (this.expiresIn) {
      case this.refreshThreshold:
        this.expiresIn = this.expiresIn - 1;
        this.setState({ refresh: true });
        break;

      case 0:
        const { onStopped } = this.props;

        clearInterval(this.timerID);
        this.expiresIn = -1;
        this.setState({ started: false, refresh: false });

        // Call callback function when session stopped
        if (onStopped) {
          onStopped();
        }
        break;

      default:
        this.expiresIn = this.expiresIn - 1;
        break;
    }
  };

  /**
   * Use render props to expose the internal state to be
   * used by children components
   * @returns {*}
   */
  render() {
    return(
      <React.Fragment>
        {this.props.render(this.state)}
      </React.Fragment>
    );
  }
}

export default SessionTimeout;
