/**
 * @prettier
 * @description: SchemaFormToolbarActions
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import Form from '../../providers/context/Form'

/**
 * SchemaFormToolbarActions
 * @returns {*}
 * @constructor
 */
function SchemaFormToolbarActions() {
  return (
    <Form.Consumer>
      {({ selectedId, onSubmit, onRemove, onReset }) => {
        return selectedId !== '' ? (
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
      }}
    </Form.Consumer>
  )
}

export default SchemaFormToolbarActions
