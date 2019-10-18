/**
 * @prettier
 * @description: TextField
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

const styles = theme => ({
  root: {
    margin: theme.spacing(1)
  }
})

/**
 * TextField component
 * @param {object} props
 * @returns {*}
 * @constructor
 */
function TextField(props) {
  const {
    classes,
    disabled,
    fullWidth,
    margin,
    variant,
    id,
    required,
    label,
    value,
    onChange
  } = props

  return (
    <FormControl
      className={classes.root}
      disabled={disabled}
      fullWidth={fullWidth}
      margin={margin}
      variant={variant}
    >
      <InputLabel htmlFor={id} required={required}>{label}</InputLabel>
      <Input
        id={id}
        type='text'
        value={value}
        onChange={onChange(id)}
      />
    </FormControl>
  )
}

TextField.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
  id: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
}

TextField.defaultProps = {
  disabled: false,
  fullWidth: true,
  margin: 'normal',
  variant: 'standard',
  required: false,
  label: 'label'
}

// Inject styles
export default withStyles(styles)(TextField)
