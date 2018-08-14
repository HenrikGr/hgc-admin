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
import ErrorSnackbar from '../components/error/ErrorSnackbar'
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
    find: PropTypes.func.isRequired,
    /**
     * Function to update db
     */
    update: PropTypes.func.isRequired,
    /**
     * Function to update input data in global state
     */
    updateState: PropTypes.func.isRequired,
    /**
     * Function to reset error
     */
    reset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.find();
  }

  handleChange = prop => event => {
    this.props.updateState({ [prop]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.update(this.props.entity);
  };

  handleResetError = () => {
    this.props.reset();
  };

  render() {
    const { entity, isFetching, error  } = this.props;

    return (
      <Grid container spacing={ 0 }>
        <Grid item xs={ 12 }>

          <ErrorSnackbar
            error={ error }
            onResetError={ this.handleResetError }
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

const mapStateToProps = state => ({
  entity: state.profile.entity,
  isFetching: state.profile.isFetching,
  error: state.profile.error,
});

const mapDispatchToProps = dispatch => {
  return {
    find: () => {
      dispatch(profileAction.getProfile());
    },
    update: profile => {
      dispatch(profileAction.updateProfile(profile));
    },
    updateState: profile => {
      dispatch(profileAction.handleChange(profile))
    },
    reset: () => {
      dispatch({
        type: "RESET_ERROR",
      })
    }
  };
};

// Inject state and action creators to presentation layer
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);