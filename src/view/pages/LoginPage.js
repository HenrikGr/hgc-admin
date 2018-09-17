/**
 * @prettier
 * @description: Container component for LoginForm component
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
     * @public
     */
    isAuthenticated: PropTypes.bool.isRequired,
    /**
     * Flag indicating fetch state
     * @public
     */
    isFetching: PropTypes.bool.isRequired,
    /**
     * Callback mapped to user action
     * @public
     */
    logIn: PropTypes.func.isRequired
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
   * Event handler to deal with input values from the form
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  /**
   * Event handler for form submit
   * @param event
   */
  handleSubmit = event => {
    const { username, password } = this.state
    event.preventDefault()
    this.props.logIn({ username, password })
  }

  /**
   * Event handler for toggle password visibility
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
    const { isAuthenticated, isFetching } = this.props
    const { username, password, showPassword } = this.state

    if (isAuthenticated) {
      const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
      return <Redirect to={from} />
    }

    return (
      <LoginForm
        formLabel="Log in"
        entity={{ username, password }}
        showPassword={showPassword}
        disableSubmit={isFetching}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        onShowPassword={this.handleShowPassword}
      />
    )
  }
}

/**
 * Map state data to props
 * @param state
 * @returns {{isAuth: boolean, isFetching: boolean, error: (defaults.user.error|{})}}
 */
const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuth,
  isFetching: state.isFetching
})

/**
 * Map user actions to props
 * @param dispatch
 * @returns {{logIn: logIn, resetError: resetError}}
 */
const mapDispatchToProps = dispatch => {
  return {
    logIn: credentials => {
      dispatch(userAction.logIn(credentials))
    }
  }
}

// Connect mapped state data and user actions to component properties
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
