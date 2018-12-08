/**
 * @prettier
 * @description: TabsNavigator
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper/Paper'
import Tab from '@material-ui/core/Tab/Tab'
import Tabs from '@material-ui/core/Tabs/Tabs'

/**
 * TabsNavigator
 * @param variant
 * @param selectedItem
 * @param items
 * @param onChange
 * @returns {*}
 * @constructor
 */
function TabsNavigator({ variant, selectedItem, items, onChange }) {
  // If no id set value false
  const value = selectedItem._id ? selectedItem._id : false

  return (
    <Paper square={true}>
      <Toolbar variant={variant}>
        <Tabs
          value={value}
          onChange={onChange}
          indicatorColor="secondary"
          textColor="inherit"
          scrollable
          scrollButtons={'off'}
        >
          {items.length > 0 &&
            items.map((item, index) => <Tab key={index} label={item.name} value={item._id} />)}
        </Tabs>
      </Toolbar>
    </Paper>
  )
}

TabsNavigator.propTypes = {
  /**
   * Toolbar variant
   */
  variant: PropTypes.string,
  /**
   * Selected item
   */
  selectedItem: PropTypes.object,
  /**
   * items
   */
  items: PropTypes.array,
  /**
   * onChange event callback
   */
  onChange: PropTypes.func
}

TabsNavigator.defaultProps = {
  variant: 'regular'
}

export default TabsNavigator
