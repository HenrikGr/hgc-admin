/**
 * Description: PasswordField component
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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  },
});

/**
 * PasswordField
 * @param props
 * @returns {*}
 * @constructor
 */
function PasswordField(props) {
  const {
    classes,
    id,
    disabled,
    required,
    autoComplete,
    value,
    label,
    showPassword,
    onChange,
    onShowPassword
  } = props;

  return(
    <FormControl className={ classes.root }>
      <InputLabel
        htmlFor={ id }
        required={ required }
      >
        { label }
      </InputLabel>
      <Input
        id={ id }
        disabled={ disabled }
        type={ showPassword ? 'text' : 'password' }
        value={ value }
        autoComplete={ autoComplete }
        onChange={ onChange(id) }
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={ onShowPassword }
              onMouseDown={ onShowPassword }
            >
              { showPassword ? <VisibilityOff /> : <Visibility /> }
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

PasswordField.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  autoComplete: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onShowPassword: PropTypes.func.isRequired,
};

PasswordField.defaultProps = {
  id: "password",
  disabled: false,
  required: true,
  label: "Password",
  showPassword: false,
};

// Inject styles
export default withStyles(styles)(PasswordField);
