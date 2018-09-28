/**
 * @prettier
 * @description: SchemaFormNavigator
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import ScrollableTabs from '../tabs/ScrollableTabs'

/**
 * SchemaFormHeader
 * @param entities
 * @param selectedId
 * @param onSelect
 * @returns {*}
 * @constructor
 */
function SchemaFormNavigator({ entities, selectedId, onSelect }) {
  return (
    <ScrollableTabs
      entities={entities}
      selectedId={selectedId}
      onSelect={onSelect}
    />
  )
}

/**
 * Props API
 */
SchemaFormNavigator.propTypes = {
  entities: PropTypes.array.isRequired,
  selectedId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default SchemaFormNavigator
