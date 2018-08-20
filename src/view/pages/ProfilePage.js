/**
 * Description: Container component for the profile page
 *
 * The ProfilePage components supplies data and functions to the profile form
 * and manage the remote operations to the backend
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2018 HGC AB
 * @license: The MIT License (MIT)
 */

// react & redux
import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// material-ui
import Grid from '@material-ui/core/Grid';

// custom component - presentation layer
import Notification from '../components/notification/Notification'
import LinearProgressbar from '../components/progress/LinearProgressbar'
import ProfileForm from '../components/forms/ProfileForm';

// Action creators used to update profile state
import profileAction from "../../store/actions/ProfileActions";

/**
 * ProfilePage
 */
class ProfilePage extends React.Component {
  static propTypes = {
    /**
     * Data entity to be rendered by the form
     */
    entity: PropTypes.object.isRequired,
    /**
     * Flag indicating fetch actions
     */
    isFetching: PropTypes.bool.isRequired,
    /**
     * error object
     */
    error: PropTypes.object.isRequired,
    /**
     * Function to get data from db
     */
    getProfile: PropTypes.func.isRequired,
    /**
     * Function to update db
     */
    updateProfile: PropTypes.func.isRequired,
    /**
     * Function to update input data in global state
     */
    updateProfileState: PropTypes.func.isRequired,
    /**
     * Function to reset error
     */
    resetProfileError: PropTypes.func.isRequired,
  };

  /**
   * Get profile on mount
   */
  componentDidMount() {
    this.props.getProfile();
  }

  /**
   * Event handler to deal with input field changes
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    this.props.updateProfileState({ [prop]: event.target.value });
  };

  /**
   * Event handler for submitting the form
   * @param event
   */
  handleSubmit = event => {
    event.preventDefault();
    this.props.updateProfile(this.props.entity);
  };

  /**
   * Event handler to deal with resetting error notifications
   */
  handleResetError = () => {
    this.props.resetProfileError();
  };

  render() {
    const { entity, isFetching, error  } = this.props;

    return (
      <Grid container spacing={ 0 }>
        <Grid item xs={ 12 }>

          <Notification
            variant="error"
            messages={ error }
            onResetMessages={ this.handleResetError }
          />

          <LinearProgressbar
            isFetching={ isFetching}
          />

          <ProfileForm
            formLabel="Profile"
            entity={entity}
            isFetching={isFetching}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />

        </Grid>
      </Grid>
    );
  }
}

/**
 * Map global state to props
 * @param state
 */
const mapStateToProps = state => ({
  entity: state.profile.entity,
  isFetching: state.profile.isFetching,
  error: state.profile.error,
});

/**
 * Map actions to props
 * @param dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => {
      dispatch(profileAction.getProfile());
    },
    updateProfile: profile => {
      dispatch(profileAction.updateProfile(profile));
    },
    updateProfileState: profile => {
      dispatch(profileAction.updateProfileState(profile))
    },
    resetProfileError: () => {
      dispatch(profileAction.resetProfileError())
    }
  };
};

// Inject state and action creators to presentation layer
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);