/**
 * @prettier
 * @description: Toolbar component with tabs navigation
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'
import SchemaFormNavigator from './SchemaFormNavigator'
import SchemaFormActions from './SchemaFormActions'
import Paper from '@material-ui/core/Paper/Paper'
import { withStyles } from '@material-ui/core/styles'
import Form from '../../providers/context/Form'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})

/**
 * SchemaFormHeader
 * @param classes
 * @returns {*}
 * @constructor
 */
function SchemaFormHeader({ classes }) {
  return (
    <Form.Consumer>
      {({ entities, entity, onSubmit, onRemove, onReset, onSelect }) => {
        const isSelected = entity._id !== undefined
        const selectedId = entity._id !== undefined ? entity._id : ''
        console.log('selectedId', selectedId)
        return (
          <Paper square={true}>
            <div className={classes.toolbar} />
            <Toolbar variant="dense">
              <SchemaFormNavigator entities={entities} selectedId={selectedId} onSelect={onSelect} />
              <SchemaFormActions
                isSelected={isSelected}
                onSubmit={onSubmit}
                onRemove={onRemove}
                onReset={onReset}
              />
            </Toolbar>
          </Paper>
        )
      }}
    </Form.Consumer>
  )
}

/**
 * Props API
 */
SchemaFormHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  entities: PropTypes.array,
  entity: PropTypes.object,
  onSubmit: PropTypes.func,
  onRemove: PropTypes.func,
  onReset: PropTypes.func,
  OnSelect: PropTypes.func,
}

export default withStyles(styles)(SchemaFormHeader)
