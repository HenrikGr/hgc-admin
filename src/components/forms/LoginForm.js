/**
 * Description LoginForm component
 *
 * The LoginForm component is a controlled component rendering 2 fields,
 * username and password to provide authentication service.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import React from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import { LinearProgress } from "material-ui/Progress";
import Input, { InputLabel, InputAdornment } from "material-ui/Input";
import { FormControl, FormLabel, FormHelperText } from "material-ui/Form";
import Visibility from "material-ui-icons/Visibility";
import VisibilityOff from "material-ui-icons/VisibilityOff";
import { isEmpty } from "../../modules/utils/helper";

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
    formLabel: PropTypes.string.isRequired
  };

  static defaultProps = {
    formLabel: "Log in"
  };

  state = {
    username: "",
    password: "",
    error: {},
    showPassword: false,
    redirectToReferrer: false
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { session } = nextProps;
    if (!session.isFetching) {
      if (!session.error) {
        this.setState({ redirectToReferrer: true });
      } else {
        this.setState({ error: session.error });
      }
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value, error: {} });
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.Login(this.state.username, this.state.password);
  };

  render() {
    const { classes, formLabel } = this.props;
    const isError = !isEmpty(this.state.error);
    const emailMessage =
      isError && this.state.error.username ? this.state.error.username : "";
    const passwordMessage =
      isError && this.state.error.password ? this.state.error.password : "";
    const label =
      isError && this.state.error.message
        ? formLabel + " - " + this.state.error.message
        : formLabel;

    // Redirect after successful login
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    };
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.progress}>
          {this.props.isFetching ? <LinearProgress color="secondary" /> : null}
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
                inputRef={node => {
                  this.username = node;
                }}
                value={this.state.username}
                onChange={this.handleChange("username")}
              />
              <FormHelperText>{emailMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                inputRef={node => {
                  this.password = node;
                }}
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
