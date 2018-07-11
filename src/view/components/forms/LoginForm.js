/**
 * Description LoginForm component
 *
 * The LoginForm component is a controlled component holding local state for;
 * - username, bind user input
 * - password, bind user input
 * - redirectToReferer, set after successful login to redirect to where the user came from
 * - showPassword, is used to toggle the password fields between asterisk and text.
 *
 * The LoginForm component receives a session state object and
 * Login and ResetSession functions as props.
 *
 * The session state object can hold one of the following states;
 * - isFetching,
 * - error,
 * - session, consisting of an access_token on successful authentication.
 *
 * The Login function passed in as props is used to perform a remote call to authenticate
 * the credentials in the username and password fields.
 *
 * The ResetSession function is used to reset possible error messages from the store
 * if a user goes somewhere else and returns to the login page or when the user
 * first start to typing.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & router
import React from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

// material-ui
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withStyles } from "@material-ui/core/styles";

// custom components & helpers
import { isEmpty } from "../../../utils/helper";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  progress: {
    flexGrow: 1,
    height: "5px"
  },
  formWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "80px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "552px"
    }
  },
  formControl: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

/**
 * LoginForm component
 */
class LoginForm extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes property to customize the style
     */
    classes: PropTypes.object.isRequired,
    /**
     * Form label
     */
    formLabel: PropTypes.string.isRequired,
    /**
     * Session object from the global store
     */
    session: PropTypes.object.isRequired,
    /**
     * Login function
     */
    Login: PropTypes.func.isRequired,
    /**
     * Reset session function
     */
    ResetSession: PropTypes.func.isRequired,
  };

  static defaultProps = {
    formLabel: "Log in",
    session: {}
  };

  state = {
    username: "",
    password: "",
    showPassword: false,
    redirectToReferrer: false
  };

  /**
   * Update local state with error or redirectToReferer depending on stat
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { session } = nextProps;

    if (isEmpty(session)) {
      return null;
    }

    if (!session.isFetching) {
      if (!session.error) {
        // On successful log in set internal flag for redirection.
        return {
          redirectToReferrer: true
        };
      }
    }
    return null;
  }

  /**
   * Clear up possible error messages so they do not show up
   * when navigate back to login form
   */
  componentWillUnmount() {
    const { session } = this.props;
    if (session.error) {
      this.props.ResetSession();
    }
  }

  /**
   * Event handler
   * @param prop
   * @returns {Function}
   */
  handleChange = prop => event => {
    const { session } = this.props;
    if (session.error) {
      this.props.ResetSession();
    }
    this.setState({ [prop]: event.target.value });
  };

  /**
   * Event handler
   */
  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  /**
   * Event handler
   * @param event
   */
  handleSubmit = event => {
    event.preventDefault();
    this.props.Login(this.state.username, this.state.password);
  };

  render() {
    const { classes, formLabel, session } = this.props;
    const isError = session.error ? !isEmpty(session.error) : false;
    const emailMessage =
      isError && session.error.username ? session.error.username : "";
    const passwordMessage =
      isError && session.error.password ? session.error.password : "";
    const label =
      isError && session.error.message
        ? formLabel + " - " + session.error.message
        : formLabel;

    // Redirect after successful login to where the user come from
    if (this.state.redirectToReferrer) {
      const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
      return <Redirect to={from} />;
    }

    return (
      <div className={ classes.root }>
        <div className={ classes.progress }>
          { session.isFetching ? <LinearProgress color="secondary" /> : null }
        </div>
        <div className={ classes.formWrapper }>
          <form className={ classes.form } onSubmit={ this.handleSubmit }>
            <FormLabel component="legend" error={ isError }>
              { label }
            </FormLabel>
            <FormControl className={ classes.formControl } error={ emailMessage !== "" }>
              <InputLabel htmlFor="username">E-mail address</InputLabel>
              <Input
                id="username"
                autoComplete="username email"
                value={ this.state.username }
                onChange={this.handleChange("username")}
              />
              <FormHelperText>{ emailMessage }</FormHelperText>
            </FormControl>
            <FormControl className={ classes.formControl } error={ passwordMessage !== "" }>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                autoComplete="current-password"
                type={ this.state.showPassword ? "text" : "password" }
                value={ this.state.password }
                onChange={this.handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={ this.handleShowPassword }>
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{ passwordMessage }</FormHelperText>
            </FormControl>
            <Button
              disabled={ session.isFetching }
              type="submit"
              variant="raised"
              color="primary"
              className={ classes.button }
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
