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

// module dependencies.
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
    duration: PropTypes.number,
    /**
     * Callback On start function
     */
    onStart: PropTypes.func,
    /**
     * Callback On refresh function, can be used to display a dialog to extend the session
     */
    onRefresh: PropTypes.func,
    /**
     * Callback On stop function, can be used to redirect to a login page
     */
    onStop: PropTypes.func,
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
   * @param nextProps
   * @param nextContext
   */
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.duration !== nextProps.duration) {

      // Stop timer
      if (nextProps.duration === 0) {
        clearInterval(this.timerID);
        this.expiresIn = -1;
        this.setState({ started: false, refresh: false });
      }

      // Start timer
      if (nextProps.duration > 0) {
        this.expiresIn = nextProps.duration;
        this.setState({ started: true, refresh: false });
        this.timerID = setInterval(() => this.tick(), this.granularity);
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
        clearInterval(this.timerID);
        this.expiresIn = -1;
        this.setState({ started: false, refresh: false });
        const { onStop } = this.props;
        if (onStop) {
          onStop();
        }
        break;

      default:
        this.expiresIn = this.expiresIn - 1;
        break;
    }
  };

  /**
   * Use render props to expose the internal state to be
   * used by other components
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
