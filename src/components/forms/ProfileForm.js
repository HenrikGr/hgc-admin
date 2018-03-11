/**
 * Description
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl, FormLabel, FormHelperText } from "material-ui/Form";
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
 * ProfileForm component
 */
class ProfileForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    error: {}
  };

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { profile } = nextProps;
    if (!profile.isFetching) {
      if (!profile.error) {
        this.setState({
          email: profile.email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone
        });
      } else {
        this.setState({ error: profile.error });
      }
    }
  }

  handleChange = prop => event => {
    this.setState({
      [prop]: event.target.value,
      error: {}
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.updateProfile(
      this.state.email,
      this.state.firstName,
      this.state.lastName,
      this.state.phone
    );
  };

  render() {
    const { classes } = this.props;
    const isError = !isEmpty(this.state.error);
    const emailMessage =
      isError && this.state.error.email ? this.state.error.email : "";
    const firstNameMessage =
      isError && this.state.error.firstName ? this.state.error.firstName : "";
    const lastNameMessage =
      isError && this.state.error.lastName ? this.state.error.lastName : "";
    const phoneMessage =
      isError && this.state.error.phone ? this.state.error.phone : "";

    return (
      <div className={classes.root}>
        <div className={classes.progress}>
          {this.props.profile.isFetching ? (
            <LinearProgress color="secondary" />
          ) : null}
        </div>
        <div className={classes.formWrapper}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormLabel component="legend" error={isError}>
              Profile information
            </FormLabel>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="email">E-mail address</InputLabel>
              <Input
                id="email"
                inputRef={node => {
                  this.email = node;
                }}
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
              <FormHelperText>{emailMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="firstName">First name</InputLabel>
              <Input
                id="firstName"
                inputRef={node => {
                  this.firstName = node;
                }}
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
              />
              <FormHelperText>{firstNameMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="lastName">Last name</InputLabel>
              <Input
                id="lastName"
                inputRef={node => {
                  this.lastName = node;
                }}
                value={this.state.lastName}
                onChange={this.handleChange("lastName")}
              />
              <FormHelperText>{lastNameMessage}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} error={isError}>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input
                id="phone"
                inputRef={node => {
                  this.phone = node;
                }}
                value={this.state.phone}
                onChange={this.handleChange("phone")}
              />
              <FormHelperText>{phoneMessage}</FormHelperText>
            </FormControl>
            <Button
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
