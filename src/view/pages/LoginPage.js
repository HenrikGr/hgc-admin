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
import Grid from '@material-ui/core/Grid'
import LoginForm from '../components/forms/LoginForm'
import Notification from '../components/notification/Notification'
import LinearProgressbar from '../components/progress/LinearProgressbar'

// Action creators used to update session state
import userAction from '../../store/actions/UserAction'
import { isEmpty } from '../../utils/helper'

/**
 * LoginPage container component
 * @class LoginPage
 * @public
 */
class LoginPage extends React.PureComponent {
  /**
   * Property type checks
   */
  static propTypes = {
    /**
     * Flag indicating if user successfully logged in
     */
    isAuth: PropTypes.bool.isRequired,
    /**
     * Flag indicating fetch state
     */
    isFetching: PropTypes.bool.isRequired,
    /**
     * error object
     */
    error: PropTypes.object.isRequired,
    /**
     * Callback mapped to user action
     */
    logIn: PropTypes.func.isRequired,
    /**
     * Callback mapped to user action
     */
    resetError: PropTypes.func.isRequired
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
   * Reset possible errors on un mount
   */
  componentWillUnmount() {
    if (!isEmpty(this.props.error)) {
      this.props.resetError()
    }
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
   * Event handler to reset validation errors
   */
  handleReset = () => {
    if (!isEmpty(this.props.error)) {
      this.props.resetError()
    }
  }

  render() {
    const { isAuth, isFetching, error } = this.props
    const { username, password, showPassword } = this.state

    if (isAuth) {
      const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
      return <Redirect to={from} />
    }

    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Notification variant="error" messages={error} onResetMessages={this.handleReset} />
          <LinearProgressbar isFetching={isFetching} />
          <LoginForm
            formLabel="Log in"
            entity={{ username, password }}
            showPassword={showPassword}
            disableSubmit={isFetching}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            onShowPassword={this.handleShowPassword}
          />
        </Grid>
      </Grid>
    )
  }
}

/**
 * Map state to props
 * @param state
 * @returns {{isAuth: boolean, isFetching: boolean, error: (defaults.user.error|{})}}
 */
const mapStateToProps = state => ({
  isAuth: state.user.isAuth,
  isFetching: state.user.isFetching,
  error: state.user.error
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
    },
    resetError: () => {
      dispatch(userAction.resetError())
    }
  }
}

// Connect mapped state and user actions to component properties
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
