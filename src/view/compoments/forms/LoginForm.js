/**
 * Description LoginForm component
 *
 * The LoginForm component is a controlled component holding local state for;
 * - username, bind user input
 * - password, bind user input
 * - redirectToReferer, set after successful login to redirect to where the user came from
 * - showPassword, is used to toggle the password fields between asterisk and text.
 *
 * The LoginForm component receives a session state object and a Login function as props.
 *
 * The session state object can hold one of the following states;
 * - isFetching,
 * - error,
 * - session, consisting of an access_token on successful authentication.
 *
 * The Login function passed in as props is used to perform a remote call to authenticate
 * the credentials in the username and password fields.
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
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import { LinearProgress } from "material-ui/Progress";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl, FormLabel, FormHelperText } from "material-ui/Form";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";

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
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
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
  static propTypes = {
    classes: PropTypes.object.isRequired,
    formLabel: PropTypes.string.isRequired,
    session: PropTypes.object.isRequired,
    Login: PropTypes.func.isRequired
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
   * Update internal state only when not fetching or no error (successful)
   * @param nextProps
   * @param nextContext
   */
  componentWillReceiveProps(nextProps, nextContext) {
    const { session } = nextProps;
    if (!session.isFetching) {
      if (!session.error) {
        // On successful log in set internal flag for redirection.
        this.setState(state => {
          return { ...state, redirectToReferrer: true }
        });
      }
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

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
      <div className={classes.root}>
        <div className={classes.progress}>
          {session.isFetching ? <LinearProgress color="secondary" /> : null}
        </div>
        <div className={classes.formWrapper}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormLabel component="legend" error={isError}>
              {label}
            </FormLabel>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="username">E-mail address</InputLabel>
              <Input
                id="username"
                value={this.state.username}
                onChange={this.handleChange("username")}
              />
              <FormHelperText>{emailMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleShowPassword}>
                      {this.state.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>{passwordMessage}</FormHelperText>
            </FormControl>
            <Button
              disabled={session.isFetching}
              type="submit"
              variant="raised"
              color="primary"
              className={classes.button}
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
