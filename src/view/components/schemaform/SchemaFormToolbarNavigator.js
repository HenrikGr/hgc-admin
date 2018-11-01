/**
 * @prettier
 * @description: SchemaFormToolbarNavigator
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import Tab from '@material-ui/core/Tab/Tab'
import Tabs from '@material-ui/core/Tabs/Tabs'
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
        return (
          <Tabs
            value={selectedId === '' ? false : selectedId}
            onChange={onSelect}
            indicatorColor='secondary'
            textColor='inherit'
            scrollable
            scrollButtons={entities.length > 4 ? 'auto' : 'off'}
          >
            {entities &&
              entities.map((entity, index) => (
                <Tab key={index} label={entity.name} value={entity._id} />
              ))}
          </Tabs>
        )
      }}
    </Form.Consumer>
  )
}

export default SchemaFormToolbarNavigator
