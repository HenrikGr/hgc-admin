/**
 * Description: DataGridToolBarTitle component
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
import Typography from '@material-ui/core/Typography';
import {withStyles} from "@material-ui/core/styles";

const styles = {
  root: {
    flex: '0 0 auto',
  },
};

/**
 * DataGridToolbarTitle
 * @param classes
 * @param numSelected
 * @param title
 * @returns {*}
 * @constructor
 */
function DataGridToolbarTitle({ classes, numSelected, title }) {
  return (
    <div className={ classes.root }>
      {numSelected > 0 ? (
        <Typography type="subheading">{ numSelected } { title } selected</Typography>
      ) : (
        <Typography type="title">{ title }</Typography>
      )}
    </div>
  );
}

/**
 * Props API
 */
DataGridToolbarTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(DataGridToolbarTitle);