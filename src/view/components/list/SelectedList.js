/**
 * @prettier
 * @description: SelectedList
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox/Checkbox'
import { withStyles } from '@material-ui/core/styles'

/**
 * Styles for the root container
 * @param theme
 * @returns {{root: {width: string, backgroundColor: *}}}
 */
const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

/**
 * SelectedList - render a list and pass the selected item back to the parent
 * @param classes
 * @param items
 * @param selectedItem
 * @param onSelect
 * @returns {*}
 * @constructor
 */
function SelectedList({ classes, items, selectedItem, onSelect }) {
  return (
    <div className={classes.root}>
      {items.length > 0 ? (
        <List dense component="nav">
          {items.map(item => (
            <ListItem
              button
              key={item}
              disabled={item === 'admin'}
              selected={item === selectedItem}
              onClick={() => onSelect(item)}
            >
              <ListItemText primary={item} />
              <ListItemSecondaryAction>
                <Checkbox
                  disabled={item === 'admin'}
                  checked={item === selectedItem}
                  onClick={() => onSelect(item)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  )
}

/**
 * SelectedList
 * @constructor
 */
SelectedList.propTypes = {
  /**
   * Classes to extends the components style
   */
  classes: PropTypes.object.isRequired,
  /**
   * List of items
   */
  items: PropTypes.array.isRequired,
  /**
   * Selected item
   */
  selectedItem: PropTypes.string.isRequired,
  /**
   * Callback for selected item from item list
   */
  onSelect: PropTypes.func.isRequired
}

export default withStyles(styles)(SelectedList)
