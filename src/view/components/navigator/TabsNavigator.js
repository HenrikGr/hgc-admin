/**
 * @prettier
 * @description: TabsNavigator is a navigator using material-ui tabs components
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'

// material-ui
// material-ui
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper/Paper'
import Tab from '@material-ui/core/Tab/Tab'
import Tabs from '@material-ui/core/Tabs/Tabs'

// Navigation context
import NavigationContext from '../../providers/context/Navigation'
import PropTypes from 'prop-types'

/**
 * TabsNavigator
 * @param variant
 * @returns {*}
 * @constructor
 */
function TabsNavigator({ variant }) {
  return (
    <NavigationContext.Consumer>
      {({ selectedId, entity, entities, onSelect }) => {
        return (
          <Paper square={true}>
            <Toolbar variant={variant}>
              <Tabs
                value={selectedId === '' ? false : selectedId}
                onChange={onSelect}
                indicatorColor='secondary'
                textColor='inherit'
                scrollable
                scrollButtons={entities.length > 2 ? 'auto' : 'off'}
              >
                {entities &&
                entities.map((entity, index) => (
                  <Tab key={index} label={entity.name} value={entity._id} />
                ))}
              </Tabs>
            </Toolbar>
          </Paper>

        )
      }}
    </NavigationContext.Consumer>
  )
}

TabsNavigator.propTypes = {
  variant: PropTypes.string,
}

TabsNavigator.defaultProps = {
  variant: 'regular'
}

export default TabsNavigator
