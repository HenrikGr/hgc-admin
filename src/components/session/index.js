/**
 * Description: Session component that will countdown
 * and check is session is going to be expired.
 *
 * The expired information is once passed in from the the global state as
 * a prop and then the component start the count down.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Session component
 */
export default class Session extends React.Component {
  static propTypes = {
    display: PropTypes.bool,
  };

  static defaultProps = {
    display: true,
  };

  state = {
    running: false,
    expiresIn: 0,
    granularity: 1000,    // 1 second
    threshold: 5 * 60,    // 5 minutes
  };

  timerID = null;

  componentWillReceiveProps(nextProps, nextContext) {
    const { expires_in } = nextProps.session;

    // If expired information is passed in and it has not started
    // Store the expired information, flag it to start and start
    if (expires_in > 0 && !this.state.running) {
      this.setState({ expiresIn: expires_in, running: true }, () => {
        this.start();
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * Format hours, minutes and seconds to a readable string
   * @param hours
   * @param minutes
   * @param seconds
   * @returns {string}
   */
  formatExpiresIn = ({hours, minutes, seconds}) => {
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours + ':' + minutes + ':' + seconds;
  };

  /**
   * Parse number of seconds into hour, minutes and seconds
   * @param seconds
   * @returns {{hours: number, minutes: number, seconds: number}}
   */
  parseHHMMSS = (seconds) => {
    return {
      'hours': Math.floor(seconds / 3600) % 24,
      'minutes': Math.floor(seconds / 60) | 0,
      'seconds': (seconds % 60) | 0
    };
  };

  /**
   * Start count down
   * - set the timer
   * - assign function to run every second
   */
  start = () => {
    this.timerID = setInterval( () => this.tick(), this.state.granularity );
  };

  /**
   * Stop count down
   * - clear the timer
   * - reset the component state
   * - remove session information in global state
   */
  stop = () => {
    clearInterval(this.timerID);
    this.setState({running: false, expiresIn: 0}, () => {
      this.props.removeSession();
    })
  };

  /**
   * ReStart count down
   * - clear the timer
   * - reset the component state
   * - refresh session information in global state
   */
  reStart = () => {
    clearInterval(this.timerID);
    this.setState({running: false, expiresIn: 0}, () => {
      this.props.refreshSession();
    })
  };

  /**
   * Tick function called every second
   */
  tick() {

    // Expires within 2 minutes
    if (this.state.expiresIn <= 120) {
      this.stop();
    } else {
      // Count down by a second at the time and update expires information
      const expiresIn = this.state.expiresIn === 0 ? 0 : this.state.expiresIn - 1;
      this.setState({ expiresIn: expiresIn });
    }
  }

  render() {
    return (
      this.props.render(this.props.session)
    )
  }
}
