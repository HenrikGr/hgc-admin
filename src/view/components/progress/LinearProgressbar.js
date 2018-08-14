/**
 * Description: LinearProgressbar component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
    height: "5px"
  },
};

/**
 * LinearProgressbar
 * @param classes
 * @param isFetching
 * @returns {*}
 * @constructor
 */
function LinearProgressbar({classes, isFetching}) {
  return(
    <div className={ classes.root }>
      { isFetching ? <LinearProgress color="secondary" /> : null }
    </div>
  )
}

/**
 * Props API
 */
LinearProgressbar.propTypes = {
  /**
   * Classes property to customize the style
   */
  classes: PropTypes.object.isRequired,
  /**
   * Loading indicator
   */
  isFetching: PropTypes.bool.isRequired,
};

/**
 * Default props
 * @type {{isFetching: boolean}}
 */
LinearProgressbar.defaultProps = {
  isFetching: false,
};

/**
 * Export component
 */
export default withStyles(styles)(LinearProgressbar);