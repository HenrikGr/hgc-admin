/**
 * Description LoginForm component
 *
 * The LoginForm component is a controlled component
 * and thus should not hold any state data.
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
import FormLabel from "@material-ui/core/FormLabel";
import { withStyles } from "@material-ui/core/styles";

// custom component
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
 * @param isFetching
 * @param onSubmit
 * @param onChange
 * @param onShowPassword
 * @returns {*}
 * @constructor
 */
function LoginForm({ classes, formLabel, entity, showPassword, isFetching, onSubmit, onChange, onShowPassword }) {
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
            value={ entity.username }
            onChange={ onChange }
          />

          <PasswordField
            id="password"
            value={ entity.password }
            showPassword={ showPassword }
            onChange={ onChange }
            onShowPassword={ onShowPassword }
          />

          <Button
            disabled={ isFetching }
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
 * Props API
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
   * Flag indicating fetching state
   */
  isFetching: PropTypes.bool.isRequired,
  /**
   * Callback function to handle input changes to external state
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback function to handle submit data
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Function to toggle password visibility
   */
  onShowPassword: PropTypes.func.isRequired,
};

/**
 * Default props
 * @type {{formLabel: string, showPassword: boolean, isFetching: boolean}}
 */
LoginForm.defaultProps = {
  formLabel: "Log in",
  showPassword: false,
  isFetching: false,
};

// Inject styles into the component
export default withStyles(styles)(LoginForm);
