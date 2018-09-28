/**
 * @prettier
 * @description: ClientToolbarActionsOLD component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'

const styles = theme => ({
  actions: {
    color: theme.palette.text.secondary
  },
  clear: {
    marginLeft: 'auto'
  }
})

/**
 * SchemaFormActions
 * @param classes
 * @param numSelected
 * @param onCreate
 * @param onUpdate
 * @param onRemove
 * @param onReset
 * @returns {*}
 * @constructor
 */
function ToolbarActions({ classes, numSelected, onCreate, onUpdate, onRemove, onReset }) {
  return (
    <Toolbar>
      {numSelected > 0 ? (
        <div className={classes.actions}>
          <Tooltip title="Delete">
            <IconButton aria-label="Delete" onClick={onRemove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Save">
            <IconButton aria-label="Save record" onClick={onUpdate}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear">
            <IconButton classes={{ root: classes.clear }} aria-label="Clear form" onClick={onReset}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <div className={classes.actions}>
          <Tooltip title="Create">
            <IconButton aria-label="Create record" onClick={onCreate}>
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear">
            <IconButton classes={{ root: classes.clear }} aria-label="Clear form" onClick={onReset}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  )
}

/**
 * Props API
 */
ToolbarActions.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default withStyles(styles)(ToolbarActions)
