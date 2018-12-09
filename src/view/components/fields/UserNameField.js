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
 * UserNameField
 * @param classes
 * @param value
 * @param onChange
 * @returns {*}
 * @constructor
 */
function UserNameField({ classes, value, onChange }) {
  return (
    <FormControl className={classes.root} fullWidth={true}>
      <InputLabel htmlFor="username" required={true}>
        User name
      </InputLabel>
      <Input
        id="username"
        autoComplete="username"
        type="text"
        value={value}
        onChange={onChange('username')}
      />
    </FormControl>
  )
}

/**
 * Component props
 * @type {{classes: *, value: *, onChange: *}}
 */
UserNameField.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
}

// Inject styles
export default withStyles(styles)(UserNameField)
