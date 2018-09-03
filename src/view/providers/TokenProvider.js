/**
 * Description: TokenProvider using the context API
 *
 * The token provider exposes a context that can be consumed by other component
 * and the context that is exposed will have the following shape:
 * - duration, a number that counts down every second until the token has expired,
 * - refreshToken, a function for fetching a new token,
 * - removeToken, a function to remove the token
 *
 * The token provider is dependent a global state management such as Redux
 * as a means to receive token, refresh and remove the token.
 *
 * Once the Token provider receives a new token it will start a timer that
 * will count down until the expiration of the token expires.
 *
 * The count down timer does also support refresh threshold, autoRefresh and remove threshold
 * that are configurable via props
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import sessionActions from "../../store/actions/SessionAction";
import Token from './context/Token';

/**
 * TokenProvider
 * @class TokenProvider
 * @public
 */
class TokenProvider extends React.PureComponent {

  /**
   * Property type check
   */
  static propTypes = {

    /**
     * Auto refresh flag
     * @public
     */
    autoRefresh: PropTypes.bool.isRequired,

    /**
     * Interval for the timer
     * @ignore
     */
    interval: PropTypes.number.isRequired,

    /**
     * Refresh token threshold
     * @public
     */
    refreshThreshold: PropTypes.number.isRequired,

    /**
     * Remove token threshold
     * Must be bigger than 0 and the time it takes to refresh a new token
     * @public
     */
    removeThreshold: PropTypes.number.isRequired,

    /**
     * Token received
     * @ignore
     */
    token: PropTypes.object.isRequired,

    /**
     * Refresh function to get a new token
     * @ignore
     */
    getToken: PropTypes.func.isRequired,

    /**
     * Remove function to remove the token
     * @ignore
     */
    removeToken: PropTypes.func.isRequired,
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
   * @private
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
   * Check for new token, if timer reached refresh and/or remove thresholds.
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
   * @param {number} duration - the duration in seconds when starting a new timer
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
    }, 100);
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

// Connect the mapped state and action creators to the component
export default connect(mapStateToProps, mapDispatchToProps)(TokenProvider);
