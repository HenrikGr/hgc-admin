/**
 * @prettier
 * @description: LinearProgressbar component
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

// material-ui
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    top: 0,
    width: '100%',
    position: 'fixed',
    height: "5px",
    backgroundColor: theme.palette.primary.main,
    zIndex: theme.zIndex.drawer + 2
  },
});

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
 * Map isFetching state to prop
 * @param state
 * @returns {{isFetching: *}}
 */
const mapStateToProps = state => ({
  isFetching: state.isFetching,
})

// Connect mapped state to component properties
export default connect(
  mapStateToProps,
)(withStyles(styles)(LinearProgressbar))
