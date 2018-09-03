/**
 * Description: Clock component that renders a number as a formatted string
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";

// material-ui components
import Typography from "@material-ui/core/Typography/Typography";
import { withStyles } from "@material-ui/core/styles";

// Token context consumer
import withTokenContext from '../../providers/withTokenContext'

// Helper functions to parse and format a number
import { parseHHMMSS, formatDuration } from '../../../utils/helper';

const styles = {
  root: {
    marginRight: 24
  }
};

/**
 * Function that gets a number from the token context and render it as
 * a readable time format
 * @param {object} classes - styles for the component
 * @param {object} context- token context from the token provider
 * @constructor
 */
function SessionClock({ classes, context }) {
  return(
    <Typography className={ classes.root } variant="title" color="inherit"  >
      {formatDuration(parseHHMMSS(context.duration))}
    </Typography>
  );
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
   * Token context
   * @type {object}
   * @private
   */
  context: PropTypes.object.isRequired,
};

// Inject token context and styles
export default withTokenContext(withStyles(styles)(SessionClock));

