/**
 * @prettier
 * @description: Container component for the ProfileForm component
 *
 * The container component is responsible to
 * - update global state for the presentation layer such as update edited profile information
 * - connect to the global state and action creators to deal with state updates
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2018 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Presentation layer
import ProfileForm from '../components/forms/ProfileForm'

// Profile actions
import profileAction from '../../store/actions/ProfileAction'

/**
 * ProfilePage container component
 */
class ProfilePage extends React.Component {
  /**
   * Property type checks
   * @type {Object}
   */
  static propTypes = {
    /**
     * Profile entity to be rendered by the form
     * @private
     */
    profile: PropTypes.object.isRequired,
    /**
     * Flag indicating fetch state
     * @private
     */
    isFetching: PropTypes.bool.isRequired,
    /**
     * Callback to update profile
     * @private
     */
    update: PropTypes.func.isRequired,
    /**
     * Callback to update global state with data
     * @private
     */
    updateState: PropTypes.func.isRequired
  }

  /**
   * Event handler - onChange on input elements
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    this.props.updateState({ [prop]: event.target.value })
  }

  /**
   * Event handler - onSubmit on form
   * @param event
   */
  handleSubmit = event => {
    event.preventDefault()
    this.props.update()
  }

  /**
   * Render component
   * @returns {*}
   */
  render() {
    const { profile, isFetching } = this.props
    return (
      <ProfileForm
        formLabel="Profile"
        entity={profile}
        disableSubmit={isFetching}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    )
  }
}

/**
 * Map global state to props
 * @param state
 * @returns {{profile: (defaults.user.profile|{}|i.user.profile), isFetching: *}}
 */
const mapStateToProps = state => ({
  profile: state.user.profile,
  isFetching: state.isFetching
})

/**
 * Map profile actions to props
 * @param dispatch
 * @returns {{update: update, updateState: updateState}}
 */
const mapDispatchToProps = dispatch => {
  return {
    update: () => {
      dispatch(profileAction.update())
    },
    updateState: profile => {
      dispatch(profileAction.updateState(profile))
    }
  }
}

// Connect mapped state and profile actions to component properties
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage)
