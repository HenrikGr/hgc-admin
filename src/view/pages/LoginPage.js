/**
 * @prettier
 * @description: Container component for LoginForm component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & Redux
import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// material-ui
import Grid from '@material-ui/core/Grid'

// Presentation layer
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
     * Is used to redirect
     * @ignore
     */
    isAuth: PropTypes.bool.isRequired,

    /**
     * Flag indicating fetch actions
     * @ignore
     */
    isFetching: PropTypes.bool.isRequired,

    /**
     * error object
     * @ignore
     */
    error: PropTypes.object.isRequired,

    /**
     * Function to log in
     * @ignore
     */
    logIn: PropTypes.func.isRequired,

    /**
     * Function to reset error
     * @ignore
     */
    resetError: PropTypes.func.isRequired
  }

  /**
   * Sets initial component state
   * @private
   */
  state = {
    username: '',
    password: '',
    showPassword: false,
    redirectToReferrer: false
  }

  componentWillUnmount() {
    if (!isEmpty(this.props.error)) {
      this.props.resetError()
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleSubmit = event => {
    const { username, password } = this.state
    event.preventDefault()
    this.props.logIn({ username, password })
  }

  handleShowPassword = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showPassword: !prevState.showPassword
      }
    })
  }

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
            isFetching={isFetching}
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
 * Map global state to props
 * @param state
 */
const mapStateToProps = state => ({
  isAuth: state.session.isAuth,
  isFetching: state.session.isFetching,
  error: state.session.error
})

/**
 * Map actions to props
 * @param dispatch
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

// Inject state and action creators to the presentation layer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
