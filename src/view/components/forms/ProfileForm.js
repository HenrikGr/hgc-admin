/**
 * Description: ProfileForm component
 *
 * The ProfileForm component is a controlled component
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

// custom components
import TextField from '../fields/TextField';

// CSS
import styles from '../../styles/ProfileForm'

/**
 * ProfileForm component
 * @param classes
 * @param formLabel
 * @param entity
 * @param isFetching
 * @param onChange
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
function ProfileForm({classes, formLabel, entity, isFetching, onChange, onSubmit }) {
  return(
    <div className={classes.root}>
      <div className={classes.formWrapper}>
        <form className={classes.form} onSubmit={ onSubmit } >

          <FormLabel component="legend">
            {formLabel}
          </FormLabel>

          <TextField
            id="email"
            type="email"
            label="Email"
            value={ entity.email }
            onChange={ onChange }
          />

          <TextField
            id="firstName"
            label="First name"
            value={ entity.firstName }
            onChange={ onChange }
          />

          <TextField
            id="lastName"
            label="Last name"
            value={ entity.lastName }
            onChange={ onChange }
          />

          <TextField
            id="phone"
            type="tel"
            label="Phone"
            value={ entity.phone }
            onChange={ onChange }
          />

          <Button
            disabled={isFetching}
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
  )
}

/**
 * Props type checking
 */
ProfileForm.propTypes = {
  classes: PropTypes.object.isRequired,
  formLabel: PropTypes.string.isRequired,
  entity: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

// Inject styles into the form
export default withStyles(styles)(ProfileForm);
