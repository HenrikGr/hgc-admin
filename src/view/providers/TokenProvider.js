/**
 * Description: TokenProvider using the context API
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

// Token context
import Token from './context/Token';

// User actions
import sessionActions from "../../store/actions/SessionAction";

/**
 * Token provider class that calculate the remaining time
 * before the token expires.
 * @class TokenProvider
 * @public
 */
class TokenProvider extends React.PureComponent {

  /**
   * Property type check
   * @type {Object}
   * @public
   */
  static propTypes = {

    /**
     * Auto refresh flag
     */
    autoRefresh: PropTypes.bool.isRequired,

    /**
     * Interval for the timer
     */
    interval: PropTypes.number.isRequired,

    /**
     * Refresh token threshold
     */
    refreshThreshold: PropTypes.number.isRequired,

    /**
     * Remove token threshold
     * Must be bigger than 0 and take into account the time for external removal
     */
    removeThreshold: PropTypes.number.isRequired,

    /**
     * Token received by external API and containing an expires_in property
     */
    token: PropTypes.object.isRequired,

    /**
     * Refresh function to get a new token
     */
    getToken: PropTypes.func,

    /**
     * Remove function to remove the token
     */
    removeToken: PropTypes.func,
  };

  /**
   * Sets default property values
   */
  static defaultProps = {
    autoRefresh: false,
    interval: 1000,
    refreshThreshold: 5 * 60,
    removeThreshold: 60,
  };

  /**
   * Sets initial component state
   * @public
   */
  state = {
    expiresIn: 0,
    refreshPending: false,
  };

  // Timer instance
  timeoutID = null;
  expected = 1000;

  /**
   * Stop timer on un mount
   */
  componentWillUnmount() {
    this.stopTimer();
  }

  /**
   * Check for new token and if timer reached refresh and remove thresholds.
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.token !== prevProps.token) {
      const { expires_in } = this.props.token;
      const duration = expires_in ? expires_in : 0;

      if (duration > 0) {
        this.startTimer(duration);
      }

      if (duration === 0) {
        this.stopTimer();
      }

    } else {
      // refresh threshold and autoRefresh
      if ((this.state.refreshPending && this.props.autoRefresh) &&
        (this.state.expiresIn === this.props.refreshThreshold - 1)) {
        this.handleRefresh();
      }

      // remove threshold
      if (this.state.expiresIn === this.props.removeThreshold) {
        this.handleRemove();
      }
    }
  }

  /**
   * Start/Restart timer
   * @param {string} duration - the duration in seconds
   * @private
   */
  startTimer = (duration) => {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
      this.timeoutID = null;
    }

    // Get expected second for next step
    this.expected = Date.now() + this.props.interval;
    this.timeoutID = setTimeout(() => {
      this.step(true, duration);
    }, 500);
  };

  /**
   * Stop timer
   * @private
   */
  stopTimer = () => {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
      this.timeoutID = null;
    }

    this.setState(state => {
      return {
        ...state,
        expiresIn: 0,
        refreshPending: false,
      }
    });
  };

  /**
   * Stepper function that should be executed every interval
   * It adjust itself for drifting
   * @param {boolean} isStarted - flag indicated if a new timer has been created
   * @param {number} duration - number of seconds the timer should run when started
   * @private
   */
  step = (isStarted, duration) => {
    let drift = Date.now() - this.expected;
    if (drift > this.props.interval) {
      console.log('Timer has drifted (drift > interval)', drift, this.props.interval);
    }
    if (this.timeoutID) {
      this.countDownDuration(isStarted, duration);
    }

    this.expected += this.props.interval;

    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(() => {
        this.step(false, duration);
      }, Math.max(0, this.props.interval - drift));
    }
  };

  /**
   * Function that runs within the step function
   * @param {boolean} isStarted - flag indicated if a new timer has been created
   * @param {number} duration - number of seconds the timer should run when started
   * @private
   */
  countDownDuration = (isStarted, duration) => {
    if (isStarted) {
      this.setState(() => {
        return {
          expiresIn: duration,
          refreshPending: false,
        }
      });
    } else {
      switch(this.state.expiresIn) {
        case this.props.refreshThreshold:
          this.setState(state => {
            return {
              ...state,
              expiresIn: state.expiresIn -1,
              refreshPending: true,
            }
          });
          break;

        // Should not occur but is here just for safety
        case 0:
          this.setState(state => {
            return {
              ...state,
              expiresIn: 0,
              refreshPending: false,
            }
          });
          break;

        default:
          this.setState(prevState => {
            return {
              expiresIn: prevState.expiresIn -1
            }
          });
          break;
      }
    }
  };

  /**
   * Get a new token
   * @private
   */
  handleRefresh = () => {
    this.props.getToken();
  };

  /**
   * Remove token
   * @private
   */
  handleRemove = () => {
    this.props.removeToken()
  };

  /**
   * Render component
   * @returns {*}
   */
  render() {

    return (
      <Token.Provider value={{
        duration: this.state.expiresIn,
        refreshState: this.state.refreshPending && !this.props.autoRefresh,
        refreshToken: this.handleRefresh,
        removeToken: this.handleRemove,
      }}>
        {this.props.children}
      </Token.Provider>
    )
  }
}

/**
 * Map global state to props
 * @param state
 * @returns {{token: (defaults.session.token|{})}}
 */
const mapStateToProps = state => {
  return {
    token: state.session.token,
  };
};

/**
 * Map action creators to props
 * @param dispatch
 * @returns {{getToken: getToken, removeToken: removeToken}}
 */
const mapDispatchToProps = dispatch => {
  return {
    getToken: () => {
      dispatch(sessionActions.refreshSession());
    },
    removeToken: () => {
      dispatch(sessionActions.removeSession());
    }
  };
};

// Inject redux state and action creators to props
export default connect(mapStateToProps, mapDispatchToProps)(TokenProvider);
