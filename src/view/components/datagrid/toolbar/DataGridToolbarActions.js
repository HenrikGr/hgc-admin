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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
  root: {
    display: 'flex',
  },
  actions: {
    display: 'inline-flex',
    color: theme.palette.text.secondary,
  },
});

/**
 * DataGridToolbarActions
 * @param classes
 * @param numSelected
 * @param onUpdate
 * @param onDelete
 * @param onCreate
 * @returns {*}
 * @constructor
 */
function DataGridToolbarActions({ classes, numSelected, onUpdate, onDelete, onCreate }) {
  return (
    <div className={ classes.root }>
      {numSelected > 0 ? (
        <div className={ classes.actions }>
          <Tooltip title="Save">
            <IconButton
              aria-label="Save record"
              onClick={ onUpdate }
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={ onDelete }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <div className={ classes.actions }>
          <Tooltip title="Create">
            <IconButton
              aria-label="Create record"
              onClick={ onCreate }
            >
              <SaveIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

/**
 * Props API
 */
DataGridToolbarActions.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataGridToolbarActions);
