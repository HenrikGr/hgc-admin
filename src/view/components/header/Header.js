/**
 * @prettier
 * @description: Header component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import HeaderMenu from './HeaderMenu'
import HeaderIcon from './HeaderIcon'
import SessionCountDown from '../session/SessionCountDown'

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    flex: 1,
    marginRight: 24
  },
  homeBtn: {
    marginLeft: -12,
    marginRight: 20
  }
})

/**
 * Header component
 * @param classes
 * @param title
 * @returns {*}
 * @constructor
 */
function Header({ classes, title }) {
  return (
    <AppBar classes={{ root: classes.root }} position="fixed">
      <Toolbar>
        <HeaderIcon />
        <Typography className={classes.title} variant="title" color="inherit">
          {title}
        </Typography>
        <SessionCountDown autoRefresh={true} />
        <HeaderMenu />
      </Toolbar>
    </AppBar>
  )
}

/**
 * Property type check
 * @type {Object}
 */
Header.propTypes = {
  /**
   * Classes to extend the style of the component
   * @private
   */
  classes: PropTypes.object.isRequired,
  /**
   * Title
   * @private
   */
  title: PropTypes.string.isRequired
}

/**
 * Sets default props
 * @type {Object}
 */
Header.defaultProps = {
  title: 'HGC AB - ' + process.env.NODE_ENV
}

// Inject styles
export default withStyles(styles)(Header)
