/**
 * @prettier
 * @description: UserProvider
 *
 * The user provider component is a controlled component and the state and
 * action creators are passed in as props.
 *
 * The user provider is a means to share user state and callbacks via the context API
 * to other sub components further down the tree, thus eliminates the need for connecting
 * via Redux connect
 *
 * Other component can consumes the user stat and action creators via the context API
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// User context
import User from './context/User'
import userActions from '../../store/actions/UserAction'

/**
 * User provider class provides information about the currant user
 * @class UserProvider
 * @public
 */
class UserProvider extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    /**
     * User state object
     * @private
     */
    user: PropTypes.object.isRequired,
    /**
     * Callback
     * @private
     */
    logIn: PropTypes.func.isRequired,
    /**
     * Callback
     * @private
     */
    refreshSession: PropTypes.func.isRequired,
    /**
     * Callback
     * @private
     */
    logOut: PropTypes.func.isRequired
  }

  state = {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user !== prevProps.user) {
      this.setState({...this.props.user})
    }
  }

  handleLogIn = () => {
    this.props.logIn()
  }

  refreshSession = () => {
    this.props.refreshSession()
  }

  handleLogOut = () => {
    this.props.logOut();
  }

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    return (
      <User.Provider
        value={{
          ...this.state,
          logIn: this.handleLogIn,
          refreshSession: this.refreshSession,
          logOut: this.handleLogOut
        }}
      >
        {this.props.children}
      </User.Provider>
    )
  }
}

/**
 * Map user state to props
 * @param state
 * @returns {{isAuth: boolean}}
 */
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

/**
 * Map user actions to props
 * @param dispatch
 * @returns {{logIn: logIn, refreshSession: refreshSession, logOut: logOut}}
 */
const mapDispatchToProps = dispatch => {
  return {
    logIn: () => {
      dispatch(userActions.logIn())
    },
    refreshSession: () => {
      dispatch(userActions.refreshSession())
    },
    logOut: () => {
      dispatch(userActions.logOut())
    }
  }
}

// connect mapped user state and user actions to component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProvider)
