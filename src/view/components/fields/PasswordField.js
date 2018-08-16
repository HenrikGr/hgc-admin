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
        {label}
      </InputLabel>
      <Input
        id={ id }
        disable={ disabled.toString() }
        autoComplete="current-password"
        type="password"
        value={ value }
        onChange={ onChange(id) }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={ onShowPassword }>
              { showPassword ? (
                <VisibilityOff />
              ) : (
                <Visibility />
              )}
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
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onShowPassword: PropTypes.func.isRequired,
};

PasswordField.defaultProps = {
  disabled: false,
  id: "password",
  required: true,
  label: "Password",
  showPassword: false,
};

// Inject styles
export default withStyles(styles)(PasswordField);
