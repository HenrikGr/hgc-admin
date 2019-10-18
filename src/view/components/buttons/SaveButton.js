/**
 * @prettier
 * @description: SaveButton
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button/Button'
import { withStyles } from '@material-ui/core/styles'

/**
 * Component styles
 * @param theme
 * @returns {{root: {margin: (number|string)}}}
 */
const styles = theme => ({
  root: {
    margin: theme.spacing(1)
  }
})

/**
 * SaveButton
 * @param classes
 * @param variant
 * @param color
 * @param onClick
 * @returns {*}
 * @constructor
 */
function SaveButton({ classes, variant, color, onClick }) {
  return (
    <Button className={classes.root} variant={variant} color={color} onClick={onClick}>
      Save
    </Button>
  )
}

/**
 * Component props
 * @type {{classes: *, variant: *, color: *, onClick: *}}
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
  onClick: PropTypes.func
}

/**
 * Default props
 * @type {{variant: string, color: string}}
 */
SaveButton.defaultProps = {
  variant: 'contained',
  color: 'primary'
}

export default withStyles(styles)(SaveButton)
