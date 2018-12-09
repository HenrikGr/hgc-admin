/**
 * @prettier
 * @description: UserNameField
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Visibility from '@material-ui/icons/Visibility'
import { withStyles } from '@material-ui/core/styles'

/**
 * Component styles
 * @param theme
 * @returns {{root: {margin: (number|string)}}}
 */
const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
})

/**
 * PasswordField
 * @param props
 * @returns {*}
 * @constructor
 */
function PasswordField(props) {
  const { classes, value, showPassword, onChange, onShow } = props

  return (
    <FormControl className={classes.root} fullWidth={true}>
      <InputLabel htmlFor="password" required={true}>
        Password
      </InputLabel>
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        value={value}
        autoComplete="current-password"
        onChange={onChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={onShow}
              onMouseDown={onShow}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

/**
 * Component props
 * @type {{classes: *, value: *, showPassword: *, onChange: *, onShow: *}}
 */
PasswordField.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string.isRequired,
  showPassword: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
}

/**
 * Default props
 * @type {{showPassword: boolean}}
 */
PasswordField.defaultProps = {
  showPassword: false
}

// Inject styles
export default withStyles(styles)(PasswordField)
