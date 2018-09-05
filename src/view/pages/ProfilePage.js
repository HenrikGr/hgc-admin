/**
 * @prettier
 * @description: Container component for the profile page
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2018 HGC AB
 * @license: The MIT License (MIT)
 */

// react & redux
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Presentation layer
import Grid from '@material-ui/core/Grid'
import Notification from '../components/notification/Notification'
import LinearProgressbar from '../components/progress/LinearProgressbar'
import ProfileForm from '../components/forms/ProfileForm'

// Profile actions
import profileAction from '../../store/actions/ProfileActions'
import { isEmpty } from '../../utils/helper'

/**
 * ProfilePage container component
 */
class ProfilePage extends React.Component {
  /**
   * Property type checks
   */
  static propTypes = {
    /**
     * Data entity to be rendered by the form
     */
    profile: PropTypes.object.isRequired,
    /**
     * Flag indicating fetch state
     */
    isFetching: PropTypes.bool.isRequired,
    /**
     * error object
     */
    error: PropTypes.object.isRequired,
    /**
     * Callback mapped to profile action
     */
    update: PropTypes.func.isRequired,
    /**
     * Callback mapped to profile action
     */
    updateState: PropTypes.func.isRequired,
    /**
     * Callback mapped to profile action
     */
    resetError: PropTypes.func.isRequired
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
   * Event handler to deal with input field changes
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    this.props.updateState({ [prop]: event.target.value })
  }

  /**
   * Event handler for submitting the form
   * @param event
   */
  handleSubmit = event => {
    event.preventDefault()
    this.props.update(this.props.profile)
  }

  /**
   * Event handler to deal with resetting error notifications
   */
  handleResetError = () => {
    this.props.resetError()
  }

  render() {
    const { profile, isFetching, error } = this.props
    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Notification variant="error" messages={error} onResetMessages={this.handleResetError} />
          <LinearProgressbar isFetching={isFetching} />
          <ProfileForm
            formLabel="Profile"
            entity={profile}
            disableSubmit={isFetching}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </Grid>
      </Grid>
    )
  }
}

/**
 * Map global state to props
 * @param state
 * @returns {{profile: *, isFetching: boolean, error: (defaults.user.error|{})}}
 */
const mapStateToProps = state => ({
  profile: state.user.profile,
  isFetching: state.user.isFetching,
  error: state.user.error
})

/**
 * Map profile actions to props
 * @param dispatch
 * @returns {{update: update, updateState: updateState, resetError: resetError}}
 */
const mapDispatchToProps = dispatch => {
  return {
    update: profile => {
      dispatch(profileAction.update(profile))
    },
    updateState: profile => {
      dispatch(profileAction.updateState(profile))
    },
    resetError: () => {
      dispatch(profileAction.resetError())
    }
  }
}

// Connect mapped state and profile actions to component properties
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage)
