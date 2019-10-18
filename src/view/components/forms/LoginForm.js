/**
 * @prettier
 * @description: LoginForm
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import * as PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import { withStyles } from '@material-ui/core/styles'

// custom components
import UserNameField from '../fields/UserNameField'
import PasswordField from '../fields/PasswordField'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: '1 0 auto',
    justifyContent: 'center',
    marginTop: theme.spacing(8)
  },
  form: {
    display: 'inline-flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    margin: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '552px'
    }
  },
  button: {
    margin: theme.spacing(1)
  }
})

/**
 * LoginForm component
 * @param {React.Props} props - component properties
 * @param {Object} props.classes - css to style the component
 * @param {String} props.formLabel - text label
 * @param {CredentialsEntityMgr} props.entity - credentials entity
 * @param {Boolean} props.showPassword - show password in plain text
 * @param {Boolean} props.disableSubmit - disable submit button on submit
 * @param {Function} props.onSubmit - called to submit the form
 * @param {Function} props.onChange - called to handle on change event for inputs
 * @param {Function} props.onShowPassword - called to handle showPassword flag
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
        <UserNameField value={entity.username} onChange={onChange} />
        <PasswordField
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
 * Component properties type check
 */
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  formLabel: PropTypes.string.isRequired,
  entity: PropTypes.object.isRequired,
  showPassword: PropTypes.bool.isRequired,
  disableSubmit: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onShowPassword: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginForm)
