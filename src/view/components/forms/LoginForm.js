/**
 * @prettier
 * @description LoginForm component
 *
 * The component is a controlled component and responsible for rendering the login form
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import { withStyles } from '@material-ui/core/styles'
import TextField from '../fields/TextField'
import PasswordField from '../fields/PasswordField'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 8
  },
  form: {
    display: 'inline-flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    margin: theme.spacing.unit * 3,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '552px'
    }
  },
  button: {
    margin: theme.spacing.unit
  }
})

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
function LoginForm({
  classes,
  formLabel,
  entity,
  showPassword,
  disableSubmit,
  onSubmit,
  onChange,
  onShowPassword
}) {
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <FormLabel component="legend">{formLabel}</FormLabel>
        <TextField
          id="username"
          label="User name"
          required={true}
          autoComplete="username"
          value={entity.username}
          onChange={onChange}
        />
        <PasswordField
          id="password"
          value={entity.password}
          showPassword={showPassword}
          onChange={onChange}
          onShow={onShowPassword}
        />
        <Button
          disabled={disableSubmit}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
      </form>
    </div>
  )
}

/**
 * Property type check
 * @type {Object}
 */
LoginForm.propTypes = {
  /**
   * Object to create or extend the styles
   * @private
   */
  classes: PropTypes.object.isRequired,
  /**
   * Form label
   * @public
   */
  formLabel: PropTypes.string.isRequired,
  /**
   * Data entity to be rendered
   * @public
   */
  entity: PropTypes.object.isRequired,
  /**
   * Flag indicating password visibility
   * @public
   */
  showPassword: PropTypes.bool.isRequired,
  /**
   * Boolean indicating if submit btn should be disabled
   * @public
   */
  disableSubmit: PropTypes.bool.isRequired,
  /**
   * Callback for input changes
   * @public
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Callback for form submit
   * @public
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Callback to toggle visible password
   * @public
   */
  onShowPassword: PropTypes.func.isRequired
}

// Inject styles into the component
export default withStyles(styles)(LoginForm)
