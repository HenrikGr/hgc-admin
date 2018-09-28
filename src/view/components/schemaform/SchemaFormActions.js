/**
 * @prettier
 * @description: SchemaFormActions
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


/**
 * SchemaFormActions
 * @param isSelected
 * @param onSubmit
 * @param onRemove
 * @param onReset
 * @returns {*}
 * @constructor
 */
function SchemaFormActions({ isSelected, onSubmit, onRemove, onReset }) {
  return isSelected ? (
    <React.Fragment>
      <Tooltip title="Save">
        <IconButton aria-label="Save record" onClick={onSubmit}>
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton aria-label="Delete" onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Clear">
        <IconButton aria-label="Clear form" onClick={onReset}>
          <ClearIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  ) : (
    <Tooltip title="Create">
      <IconButton aria-label="Create record" onClick={onSubmit}>
        <SaveIcon />
      </IconButton>
    </Tooltip>
  )
}

/**
 * Props API
 */
SchemaFormActions.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default SchemaFormActions
