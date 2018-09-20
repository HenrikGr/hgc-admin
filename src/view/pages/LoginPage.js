/**
 * @prettier
 * @description: Container component for LoginForm component
 *
 * The container component is responsible to maintain
 * - internal state for the presentation layer such as edited credentials, show passwords flags, redirection, etc
 * - connect to the user global state and action creators to deal with authentication, etc
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Presentation layer
import LoginForm from '../components/forms/LoginForm'

// Action creators used to update session state
import userAction from '../../store/actions/UserAction'

/**
 * LoginPage container component
 * @class LoginPage
 * @public
 */
class LoginPage extends React.PureComponent {
  /**
   * Property type checks
   * @type {Object}
   */
  static propTypes = {
    /**
     * Flag indicating if user successfully logged in
     * @private
     */
    isAuthenticated: PropTypes.bool.isRequired,
    /**
     * Flag indicating fetch state, i.e authenticating
     * @private
     */
    isAuthenticating: PropTypes.bool.isRequired,
    /**
     * Callback mapped to user action
     * @private
     */
    authenticate: PropTypes.func.isRequired,

    /**
     * Location from React Router
     * @private
     */
    location: PropTypes.object
  }

  /**
   * Sets initial component state
   */
  state = {
    username: '',
    password: '',
    showPassword: false,
    redirectToReferrer: false
  }

  /**
   * Event handler - onChange event on input elements
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  /**
   * Event handler - onSubmit event on form
   * @param event
   */
  handleSubmit = event => {
    const { username, password } = this.state
    event.preventDefault()
    this.props.authenticate({ username, password })
  }

  /**
   * Event handler - onShowPassword event to toggle password visibility
   */
  handleShowPassword = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showPassword: !prevState.showPassword
      }
    })
  }

  /**
   * Render component
   * @returns {*}
   */
  render() {
    const { isAuthenticated, isAuthenticating, location } = this.props
    const { username, password, showPassword } = this.state

    // Redirect if authentication success
    if (isAuthenticated) {
      const { from } = location.state || { from: { pathname: '/dashboard' } }
      return <Redirect to={from} />
    }

    return (
      <LoginForm
        formLabel="Log in"
        entity={{ username, password }}
        showPassword={showPassword}
        disableSubmit={isAuthenticating}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        onShowPassword={this.handleShowPassword}
      />
    )
  }
}

/**
 * Map user and fetching state
 * @param state
 * @returns {{isAuthenticated: boolean, isAuthenticating: *}}
 */
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuth,
  isAuthenticating: state.isFetching
})

/**
 * Map user actions to props
 * @param dispatch
 * @returns {{authenticate: authenticate}}
 */
const mapDispatchToProps = dispatch => {
  return {
    authenticate: credentials => {
      dispatch(userAction.logIn(credentials))
    }
  }
}

// Connect mapped state data and user actions to component properties
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
