/**
 * Description: UserProvider using the context API
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

// User context
import User from './context/User';

/**
 * User provider class that provides information about the currant user
 * @class UserProvider
 * @public
 */
class UserProvider extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   * @private
   */
  static propTypes = {
    /**
     * Flag indicating if the user is authenticated or not
     * default: false
     * @type {boolean}
     */
    isAuth: PropTypes.bool.isRequired,
  };

  /**
   * Sets initial component state
   * @type {Object}
   * @private
   */
  state = {
    isAuth: false,
  };

  /**
   * Check if new token received and set the internal state to
   * reflect if the user is authenticated or not.
   * TODO: Should add more user specific information such as profile information
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isAuth !== prevState.isAuth) {
      this.setState({ isAuth: this.props.isAuth});
    }
  }

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    return (
      <User.Provider value={{
        isAuth: this.props.isAuth,
      }}>
        {this.props.children}
      </User.Provider>
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
    isAuth: state.session.isAuth,
  };
};

// Inject redux state to props
export default connect(mapStateToProps, null)(UserProvider);
