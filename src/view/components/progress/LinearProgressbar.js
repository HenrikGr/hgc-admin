/**
 * Description: Users page component
 *
 * The UsersPage container components supply users state trough props and a CRUD
 * functions to be used to manage application state and perform remote calls to the
 * database.
 *
 * The users page using the DataGrid custom component and pass the data, CRUD methods and a
 * column model of the data to be rendered in the DataGrid.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
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
    <div className={ classes.progress }>
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
 * Export component
 */
export default withStyles(styles)(LinearProgressbar);