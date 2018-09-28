/**
 * @prettier
 * @description: Clock component that renders a number as a formatted string
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui components
import Typography from '@material-ui/core/Typography/Typography'
import { withStyles } from '@material-ui/core/styles'

// Helper functions to parse and format a number
import { parseHHMMSS, formatDuration } from '../../../utils/helper'

const styles = theme => ({
  root: {
    flex: '0 0 auto',
    marginRight: theme.spacing.unit * 3
  }
})

/**
 * Function that gets a number from the token context and render it as
 * a readable time format
 * @param {object} classes - styles for the component
 * @param {number} expiresIn - number to format
 * @constructor
 */
function SessionClock({ classes, expiresIn }) {
  return (
    <Typography className={classes.root} variant="title" color="inherit">
      {formatDuration(parseHHMMSS(expiresIn))}
    </Typography>
  )
}

/**
 * Property type check
 * @type {Object}
 * @private
 */
SessionClock.propTypes = {
  /**
   * Classes to extends style
   * @type {object}
   * @private
   */
  classes: PropTypes.object.isRequired,
  /**
   * Expires in number
   * @type {object}
   * @private
   */
  expiresIn: PropTypes.number.isRequired
}

// Inject token context and styles
export default withStyles(styles)(SessionClock)
