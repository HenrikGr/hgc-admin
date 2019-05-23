/**
 * @prettier
 * @description: LoginPage - container component for LoginForm component
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Presentation layer
import LoginForm from '../components/forms/LoginForm'

// SessionAction action creators
import { logIn } from '../../store/actions/SessionActions'

/**
 * LoginPage - container component for the login page
 *
 * The container component is responsible to maintain
 * - internal state for the presentation layer such as edited inputs, show passwords flags, redirection, etc
 * - connect to the global state tree and action creators to deal with authentication, etc
 */
class LoginPage extends React.PureComponent {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
  }

  /**
   * Component state
   * @type {{password: string, showPassword: boolean, redirectToReferrer: boolean, username: string}}
   */
  state = {
    username: '',
    password: '',
    showPassword: false,
    redirectToReferrer: false
  }

  /**
   * Event handler - onChange event on LoginForm input elements
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  /**
   * Event handler - onSubmit event on LoginForm component
   * @param event
   */
  handleSubmit = event => {
    event.preventDefault()
    this.props.logIn({ username: this.state.username, password: this.state.password })
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

  render() {
    const { isAuth, isFetching, location } = this.props
    const { username, password, showPassword } = this.state

    // Redirect on log in success
    if (isAuth) {
      const { from } = location.state || { from: { pathname: '/dashboard' } }
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
 * @param {State} state - Global state tree
 * @returns {{isAuth: boolean, isFetching: boolean}}
 */
const mapStateToProps = state => ({
  isAuth: state.session.isAuth,
  isFetching: state.isFetching
})

/**
 * Map logIn action creator to props
 * @type {{logIn: logIn}}
 */
const mapDispatchToProps = {
  logIn
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
