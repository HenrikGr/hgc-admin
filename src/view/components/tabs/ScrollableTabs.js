/**
 * @prettier
 * @description: ScrollableTabs component for selecting an item from a set of items
 *
 * The component is a controlled component which means you need to pass in the logic
 * for selection.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  container: {
    //maxWidth: '600px',
    minWidth: '200px'
  }
}
/**
 * ScrollableTabs
 * @param classes
 * @param items
 * @param selectedId
 * @param onSelect
 * @returns {*}
 * @constructor
 */
function ScrollableTabs({ classes, entities, selectedId, onSelect }) {
  return (
    <Tabs
      classes={{ flexContainer: classes.container }}
      value={selectedId === '' ? false : selectedId}
      onChange={onSelect}
      indicatorColor="secondary"
      textColor="inherit"
      scrollable
      scrollButtons="auto"
    >
      {entities && entities.map((entity, index) => <Tab key={index} label={entity.name} value={entity._id} />)}
    </Tabs>
  )
}

/**
 * Props API
 */
ScrollableTabs.propTypes = {
  classes: PropTypes.object,
  entities: PropTypes.array.isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default withStyles(styles)(ScrollableTabs)
