/**
 * @prettier
 * @description: ScrollableTabs component for selecting an entity from a set of entities
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

/**
 * ScrollableTabs
 * @param entities
 * @param selectedId
 * @param onSelect
 * @returns {*}
 * @constructor
 */
function ScrollableTabs({ entities, selectedId, onSelect }) {
  return (
    <Tabs
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
 * Property type check
 * @type {Object}
 */
ScrollableTabs.propTypes = {
  /**
   * Entities to select in the tabs
   */
  entities: PropTypes.array.isRequired,
  /**
   * SelectedId of selectedId entity
   */
  selectedId: PropTypes.string.isRequired,
  /**
   * Callback function
   */
  onSelect: PropTypes.func.isRequired
}

export default ScrollableTabs
