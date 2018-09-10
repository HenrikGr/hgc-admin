/**
 * @prettier
 * @description: SessionCountDown
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// Web worker variants of setInterval, etc...
import * as workerTimers from 'worker-timers';
import SessionClock from './SessionClock'
import SessionDialog from './SessionDialog'

// Consumes the user context
import withUserContext from '../../providers/withUserContext'

/**
 * SessionCountDown
 * @class SessionCountDown
 */
class SessionCountDown extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    /**
     * Auto refresh flag
     * @public
     */
    autoRefresh: PropTypes.bool,

    /**
     * Interval for the timer
     * @private
     */
    interval: PropTypes.number,

    /**
     * Refresh token threshold
     * @public
     */
    refreshThreshold: PropTypes.number,

    /**
     * Remove token threshold
     * @public
     */
    removeThreshold: PropTypes.number,

    /**
     * User context
     * @private
     */
    context: PropTypes.object.isRequired
  }

  /**
   * Sets default property values
   */
  static defaultProps = {
    autoRefresh: false,
    interval: 1000,
    refreshThreshold: 5 * 60, // 5 * 60 = 5 minutes
    removeThreshold: 4 * 60   // 4 * 60 = 4 minutes
  }

  /**
   * Set initial state
   * @param props
   */
  constructor(props) {
    super(props)
    this.state = {
      startTime: null,
      duration: 0,
      expiresIn: 0,
      refreshPending: false
    }

    this.timeoutID = null
    this.expected = 0
  }

  /**
   * Stop timer on un mount
   */
  componentWillUnmount() {
    this.stopTimer()
  }

  /**
   * Check for start and stop timer as well as refresh and remove token
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.context.token !== prevProps.context.token) {
      const { expires_in } = this.props.context.token
      const duration = expires_in ? expires_in : 0

      if (duration > 0) {
        this.startTimer(duration)
      }

      if (duration === 0) {
        this.stopTimer()
      }
    }

    if (
      this.props.autoRefresh &&
      this.state.refreshPending &&
      this.state.expiresIn === this.props.refreshThreshold - 1
    ) {
      this.handleRefreshSession()
    }

    if (this.state.expiresIn === this.props.removeThreshold) {
      this.handleRemoveSession()
    }
  }

  /**
   * Start/Restart timer
   * @param {number} duration - the duration in seconds for the timer
   */
  startTimer = duration => {
    console.log('Start timer')
    if (this.timeoutID) {
      console.log('Clear timer when starting')
      workerTimers.clearTimeout(this.timeoutID)
      this.timeoutID = null;
    }

    // Get start time
    const startTime = Date.now();
    // Get expected time for next interval
    this.expected = startTime + this.props.interval
    // start the timer after interval and pass in the worker function (step)
    this.timeoutID = workerTimers.setTimeout(this.step, this.props.interval)

    // Set start state
    this.setState({
      startTime: startTime,   // Store when the timer started
      duration: duration,     // Store seconds the component going to count down
      expiresIn: duration,    // ExpiresIn is subtracted for every interval
      refreshPending: false
    })
  }

  /**
   * Stop timer
   */
  stopTimer = () => {
    console.log('Stop timer')
    if (this.timeoutID) {
      console.log('Clear timer when stopping')
      workerTimers.clearTimeout(this.timeoutID)
      this.timeoutID = null;
    }

    // Reset state to initial after stopping the timer
    this.setState({
      startTime: null,
      duration: 0,
      expiresIn: 0,
      refreshPending: false
    })
  }

  /**
   * Stepper function that executed every interval
   */
  step = () => {
    // Get the delta between expected and now
    let delta = Date.now() - this.expected
    // If delta more than interval ???
    if (delta > this.props.interval) {
      console.log('Timer has drifted (drift > interval)', delta, this.props.interval)
      console.log('After :', this.state.duration - this.state.expiresIn)
    } else {
      // The worker function that counts down expiresIn
      this.countDownDuration()
      // Clear timeout
      if (this.timeoutID) {
        workerTimers.clearTimeout(this.timeoutID)
        this.timeoutID = null;
      }
      // Set a new expected time one second ahead
      this.expected += this.props.interval
      // Run a new timeout and compensate the interval with the delta
      this.timeoutID = workerTimers.setTimeout(this.step, Math.max(0, this.props.interval - delta))
    }
  }

  /**
   * Function that runs within the step function
   */
  countDownDuration = () => {
    switch (this.state.expiresIn) {
      case this.props.refreshThreshold:
        this.setState(prevState => {
          return { expiresIn: prevState.expiresIn - 1, refreshPending: true }
        })
        break

      // Should not occur but is here just for safety
      case 0:
        this.setState({ expiresIn: 0, refreshPending: false })
        break

      default:
        this.setState(prevState => {
          return { expiresIn: prevState.expiresIn - 1 }
        })
        break
    }
  }

  /**
   * Refresh session
   */
  handleRefreshSession = () => {
    this.props.context.refreshSession()
  }

  /**
   * Remove session
   */
  handleRemoveSession = () => {
    this.props.context.logOut()
  }

  render() {

    return (
      <React.Fragment>
        <SessionClock expiresIn={this.state.expiresIn} />
        <SessionDialog
          open={this.state.refreshPending && !this.props.autoRefresh}
          onRefresh={this.handleRefreshSession}
          onRemove={this.handleRemoveSession}
        />
      </React.Fragment>
    )
  }
}

// Connect the mapped state and action creators to the component
export default withUserContext(SessionCountDown)
