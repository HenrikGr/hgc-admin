/**
 * @prettier
 * @description: SimpleList
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
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

/**
 * SimpleList
 * @param props
 * @returns {*}
 * @constructor
 */
function SimpleList(props) {
  const { classes, items } = props
  return (
    <div className={classes.root}>
      {items.length > 0 ? (
        <List component="nav">
          {items.map(item => (
            <ListItem key={item}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  )
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleList)
