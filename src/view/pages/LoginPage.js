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
import ErrorSnackbar from "../components/error/ErrorSnackbar";
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
  static propTypes = {    /**
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
    /**
     * Function to toggle password visibility
     */
    toggleShowPassword: PropTypes.func.isRequired,
  };

  /**
   * Reset possible errors when navigation somewhere else
   */
  componentWillUnmount() {
    const { error } = this.props;
    if (!isEmpty(error)) {
      this.props.reset();
    }
  }

  /**
   * Handle global state updates from inputs
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    this.props.updateState({ [prop]: event.target.value });
  };

  /**
   * Handle submit of data
   * @param event
   */
  handleSubmit = event => {
    event.preventDefault();
    this.props.update(this.props.entity);
  };

  /**
   * Handle visibility of password input
   */
  handleShowPassword = () => {
    this.props.toggleShowPassword(!this.props.showPassword);
  };

  /**
   * Handle reset of global state (errors)
   */
  handleReset = () => {
    this.props.reset();
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

          <ErrorSnackbar
            error={ error }
            onResetError={ this.handleReset }
          />

          <LinearProgressbar
            isFetching={ isFetching}
          />

          <LoginForm
            formLabel="Log in"
            entity={entity}
            showPassword={showPassword}
            isFetching={isFetching}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            onShowPassword={this.handleShowPassword}
          />

        </Grid>
      </Grid>
    );
  }
}

/**
 * Map global state to props
 * @param state
 * @returns {{
 *  entity: *,
 *  showPassword: boolean,
 *  redirectToReferrer: boolean,
 *  isFetching: boolean,
 *  error: (session.error|{}|defaults.session.error)
 *  }}
 */
const mapStateToProps = state => ({
  entity: state.session.entity,
  showPassword: state.session.showPassword,
  redirectToReferrer: state.session.redirectToReferrer,
  isFetching: state.session.isFetching,
  error: state.session.error,
});

/**
 * Map global actions to props
 * @param dispatch
 * @returns {{
 *  update: update,
 *  updateState: updateState,
 *  reset: reset,
 *  toggleShowPassword: toggleShowPassword
 *  }}
 */
const mapDispatchToProps = dispatch => {
  return {
    update: (credentials) => {
      dispatch(sessionAction.getSession(credentials));
    },
    updateState: (value) => {
      dispatch(sessionAction.handleChange(value))
    },
    reset: () => {
      dispatch({
        type: "RESET_ERROR",
      })
    },
    toggleShowPassword: (show) => {
      dispatch(sessionAction.toggleShowPassword(show))
    }
  };
};

// Inject state and action creators to the presentation layer
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
