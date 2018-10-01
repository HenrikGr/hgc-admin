/**
 * @prettier
 * @description: SaveButton
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
 * SaveButton
 * @param classes
 * @param variant
 * @param color
 * @param onSubmit
 * @returns {*}
 * @constructor
 */
function SaveButton({ classes, variant, color, onSubmit }) {
  return (
    <Button className={classes.root} variant={variant} color={color} onClick={onSubmit}>
      Save
    </Button>
  )
}

/**
 * Property type check
 * @type {Object}
 */
SaveButton.propTypes = {
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
  onSubmit: PropTypes.func
}

/**
 * Default prop typed
 * @type {Object}
 */
SaveButton.defaultProps = {
  variant: 'raised',
  color: 'primary'
}

export default withStyles(styles)(SaveButton)
