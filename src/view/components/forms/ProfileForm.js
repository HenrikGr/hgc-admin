/**
 * Description: ProfileForm component
 *
 * The ProfileForm component is a controlled component holding local state for;
 * - email, bind user input
 * - firstName, bind user input
 * - lastName, bind user input
 * - phone, bind user input
 *
 * The ProfileForm component receives a profile state object and two functions to
 * retrieve and update profile information.
 *
 * The profile state object can hold one of the following states;
 * - isFetching,
 * - error,
 * - session, consisting of an access_token on successful authentication.
 *
 * The function passed in as props is used to perform a remote call to retrieve and update
 * profile information.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";

// material-ui
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core/styles";

// Utilities
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
 * ProfileForm component
 */
class ProfileForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    formLabel: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired
  };

  static defaultProps = {
    formLabel: "Profile",
    profile: {}
  };

  state = {
    email: "",
    firstName: "",
    lastName: "",
    phone: ""
  };

  componentDidMount() {
    this.props.getProfile();
  }

  /**
   * Update internal state only when not fetching or no error (successful)
   * @param nextProps
   * @param nextContext
   */
  componentWillReceiveProps(nextProps, nextContext) {
    const { profile } = nextProps;
    if (!profile.isFetching) {
      if (!profile.error) {
        this.setState(profile);
      }
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateProfile({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone
    });
  };

  render() {
    const { classes, formLabel, profile } = this.props;
    const isError = profile.error ? !isEmpty(profile.error) : false;
    const emailMessage =
      isError && profile.error.email ? profile.error.email : "";
    const firstNameMessage =
      isError && profile.error.firstName ? profile.error.firstName : "";
    const lastNameMessage =
      isError && profile.error.lastName ? profile.error.lastName : "";
    const phoneMessage =
      isError && profile.error.phone ? profile.error.phone : "";
    const label =
      isError && profile.error.message
        ? formLabel + " - " + profile.error.message
        : formLabel;

    return (
      <div className={classes.root}>
        <div className={classes.progress}>
          {profile.isFetching ? <LinearProgress color="secondary" /> : null}
        </div>
        <div className={classes.formWrapper}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormLabel component="legend" error={isError}>
              {label}
            </FormLabel>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="email">E-mail address</InputLabel>
              <Input
                id="email"
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
              <FormHelperText>{emailMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="firstName">First name</InputLabel>
              <Input
                id="firstName"
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
              />
              <FormHelperText>{firstNameMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="lastName">Last name</InputLabel>
              <Input
                id="lastName"
                value={this.state.lastName}
                onChange={this.handleChange("lastName")}
              />
              <FormHelperText>{lastNameMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input
                id="phone"
                value={this.state.phone}
                onChange={this.handleChange("phone")}
              />
              <FormHelperText>{phoneMessage}</FormHelperText>
            </FormControl>
            <Button
              disabled={profile.isFetching}
              type="submit"
              variant="raised"
              color="primary"
              className={classes.button}
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileForm);
