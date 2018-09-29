/**
 * @prettier
 * @description: SchemaFormToolbarNavigator
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import ScrollableTabs from '../tabs/ScrollableTabs'
import Form from '../../providers/context/Form'

/**
 * SchemaFormToolbarNavigator
 * @returns {*}
 * @constructor
 */
function SchemaFormToolbarNavigator() {
  return (
    <Form.Consumer>
      {({ entities, selectedId, entity, onSelect }) => {
        return <ScrollableTabs entities={entities} selectedId={selectedId} onSelect={onSelect} />
      }}
    </Form.Consumer>
  )
}

export default SchemaFormToolbarNavigator
