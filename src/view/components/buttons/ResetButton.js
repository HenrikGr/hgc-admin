/**
 * @prettier
 * @description: ResetButton
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
})

/**
 * ResetButton
 * @param classes
 * @param variant
 * @param color
 * @param onReset
 * @returns {*}
 * @constructor
 */
function ResetButton({ classes, variant, color, onReset }) {
  return (
    <Button className={classes.root} variant={variant} color={color} onClick={onReset}>
      Reset
    </Button>
  )
}

/**
 * Property type check
 * @type {Object}
 */
ResetButton.propTypes = {
  /**
   * Classes, can be used to override css styles
   */
  classes: PropTypes.object.isRequired,
  /**
   * Variant of the button
   */
  variant: PropTypes.string.isRequired,
  /**
   * Color of the button
   */
  color: PropTypes.string.isRequired,
  /**
   * Callback function
   */
  onReset: PropTypes.func
}

/**
 * Default props
 * @type {Object}
 */
ResetButton.defaultProps = {
  variant: 'outlined',
  color: 'default'
}

export default withStyles(styles)(ResetButton)
