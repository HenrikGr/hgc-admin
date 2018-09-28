/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles } from '@material-ui/core/styles'

// Custom components
import ClientToolbarTitle from './ClientToolbarTitle'
import ClientToolbarTabs from '../../schemaform/SchemaFormHeader'
import ClientToolbarActions from '../ToolbarActions'

const styles = theme => ({
  root: {
    display: 'flex',
    paddingRight: theme.spacing.unit,
    backgroundColor: theme.palette.background.paper
  }
})

/**
 * ClientToolbar
 * @param classes
 * @param title
 * @param items
 * @param selectedId
 * @param onSelect
 * @param onCreate
 * @param onUpdate
 * @param onRemove
 * @param onReset
 * @returns {*}
 * @constructor
 */
function ClientToolbar({
  classes,
  title,
  items,
  selectedId,
  onSelect,
  onCreate,
  onUpdate,
  onRemove,
  onReset
}) {
  return (
    <Toolbar className={classes.root}>
      <ClientToolbarTitle title={title} />
      <ClientToolbarTabs items={items} selectedId={selectedId} onSelect={onSelect} />
      <ClientToolbarActions
        numSelected={selectedId !== '' ? 1 : 0}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onRemove={onRemove}
        onReset={onReset}
      />
    </Toolbar>
  )
}

/**
 * Props API
 */
ClientToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
}

export default withStyles(styles)(ClientToolbar)
