/**
 * @prettier
 * @description LoginForm controlled component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";
import TextField from '../fields/TextField';
import PasswordField from '../fields/PasswordField';

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
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
 * @param classes
 * @param formLabel
 * @param entity
 * @param showPassword
 * @param disableSubmit
 * @param onSubmit
 * @param onChange
 * @param onShowPassword
 * @returns {*}
 * @constructor
 */
function LoginForm({ classes, formLabel, entity, showPassword, disableSubmit, onSubmit, onChange, onShowPassword }) {
  return(
    <div className={ classes.root }>
      <div className={ classes.formWrapper }>
        <form className={ classes.form } onSubmit={ onSubmit }>
          <FormLabel component="legend">
            { formLabel }
          </FormLabel>
          <TextField
            id="username"
            label="User name"
            required={true}
            autoComplete="username"
            value={ entity.username }
            onChange={ onChange }
          />
          <PasswordField
            id="password"
            autoComplete="current-password"
            value={ entity.password }
            showPassword={ showPassword }
            onChange={ onChange }
            onShowPassword={ onShowPassword }
          />
          <Button
            disabled={ disableSubmit }
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
  )
}

/**
 * Property type checks
 */
LoginForm.propTypes = {
  /**
   * Used to style the form
   */
  classes: PropTypes.object.isRequired,
  /**
   * Form label
   */
  formLabel: PropTypes.string.isRequired,
  /**
   * Data entity to be rendered as inputs
   */
  entity: PropTypes.object.isRequired,
  /**
   * Flag indicating password visibility
   */
  showPassword: PropTypes.bool.isRequired,
  /**
   * Boolean indicating if submit btn should be disabled
   */
  disableSubmit: PropTypes.bool.isRequired,
  /**
   * Callback for input changes
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback for form submit
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Callback to toggle visible password
   */
  onShowPassword: PropTypes.func.isRequired
}

/**
 * Default properties value
 * @type {{formLabel: string, showPassword: boolean, isFetching: boolean}}
 */
LoginForm.defaultProps = {
  formLabel: "Log in",
  showPassword: false,
  isFetching: false,
};

// Inject styles into the component
export default withStyles(styles)(LoginForm);
