/**
 * Description: Container component for LoginForm component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & Redux
import React from 'react';
import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// material-ui
import Grid from '@material-ui/core/Grid';

// custom component
import Notification from "../components/notification/Notification";
import LinearProgressbar from "../components/progress/LinearProgressbar";

// Presentation layer
import LoginForm from "../components/forms/LoginForm";

// Action creators used to update session state
import sessionAction from '../../store/actions/SessionAction';
import {isEmpty} from "../../utils/helper";

/**
 * LoginPage
 */
class LoginPage extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Data entity to be rendered by the form
     */
    entity: PropTypes.object.isRequired,
    /**
     * Flag indicating if visible password
     */
    showPassword: PropTypes.bool.isRequired,
    /**
     * Flag indicating redirect to referrer state from history
     */
    redirectToReferrer: PropTypes.bool.isRequired,
    /**
     * Flag indicating fetch actions
     */
    isFetching: PropTypes.bool.isRequired,
    /**
     * error object
     */
    error: PropTypes.object.isRequired,
    /**
     * Function to get session from db
     */
    getSession: PropTypes.func.isRequired,
    /**
     * Function to update input data in global state
     */
    updateCredentials: PropTypes.func.isRequired,
    /**
     * Function to reset session validation error
     */
    resetSessionError: PropTypes.func.isRequired,
    /**
     * Function to toggle password visibility
     */
    togglePasswordVisible: PropTypes.func.isRequired,
  };

  /**
   * Reset possible errors on un mount
   */
  componentWillUnmount() {
    if (!isEmpty(this.props.error)) {
      this.props.resetSessionError();
    }
  }

  /**
   * Event handler to deal with input values
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    this.props.updateCredentials({ [prop]: event.target.value });
  };

  /**
   * Event handler for form submit
   * @param event
   */
  handleSubmit = event => {
    event.preventDefault();
    this.props.getSession(this.props.entity);
  };

  /**
   * Event handler for toggle password visibility
   */
  handleShowPassword = () => {
    this.props.togglePasswordVisible();
  };

  /**
   * Event handler to reset validation errors
   */
  handleReset = () => {
    if (!isEmpty(this.props.error)) {
      this.props.resetSessionError();
    }
  };

  render() {
    const {
      entity,
      showPassword,
      redirectToReferrer,
      isFetching,
      error
    } = this.props;

    if (redirectToReferrer) {
      const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
      return <Redirect to={from} />;
    }

    return (
      <Grid container spacing={ 0 }>
        <Grid item xs={ 12 }>

          <Notification
            variant="error"
            messages={ error }
            onResetMessages={ this.handleReset }
          />

          <LinearProgressbar
            isFetching={ isFetching}
          />

          <LoginForm
            formLabel="Log in"
            entity={ entity }
            showPassword={ showPassword }
            isFetching={ isFetching }
            onSubmit={ this.handleSubmit }
            onChange={ this.handleChange }
            onShowPassword={ this.handleShowPassword }
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
  entity: state.session.entity,
  showPassword: state.session.showPassword,
  redirectToReferrer: state.session.redirectToReferrer,
  isFetching: state.session.isFetching,
  error: state.session.error,
});

/**
 * Map actions to props
 * @param dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    getSession: (credentials) => {
      dispatch(sessionAction.getSession(credentials));
    },
    updateCredentials: (value) => {
      dispatch(sessionAction.updateCredentials(value))
    },
    resetSessionError: () => {
      dispatch(sessionAction.resetSessionError())
    },
    togglePasswordVisible: () => {
      dispatch(sessionAction.togglePasswordVisible())
    }
  };
};

// Inject state and action creators to the presentation layer
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
