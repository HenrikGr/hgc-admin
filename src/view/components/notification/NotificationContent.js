/**
 * @prettier
 * @description: Notification content component that renders the notification
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { withStyles } from '@material-ui/core/styles'

// helper
import { capitalizeFirstLetter } from '../../../utils/stringHelper'

// Variant icons
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

const styles = theme => ({
  success: {
    backgroundColor: green[600],
    display: 'flex',
    flexDirection: 'column'
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    display: 'flex',
    flexDirection: 'column'
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    flexDirection: 'column'
  },
  warning: {
    backgroundColor: amber[700],
    display: 'flex',
    flexDirection: 'column'
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    alignItems: 'flex-start'
  }
})

/**
 * Helper function to transform message object into HTML string
 * @param messages
 * @returns {string}
 */
const getMessage = messages => {
  let message = messages.message

  let msg = '<div>' + message + '</div></br>'
  if (messages.details) {
    for (const [key, value] of Object.entries(messages.details)) {
      msg = msg + '<div>' + capitalizeFirstLetter(key) + ' ' + value + '</div>'
    }
  }
  return msg
}

/**
 * NotificationContent component
 * @param classes
 * @param messages
 * @param onClose
 * @param variant
 * @param other
 * @returns {*}
 * @constructor
 */
function NotificationContent({ classes, messages, onClose, variant, ...other }) {
  const Icon = variantIcon[variant]
  return (
    <SnackbarContent
      className={classNames(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <div id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          <div id="message-id" dangerouslySetInnerHTML={{ __html: getMessage(messages) }} />
        </div>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  )
}

/**
 * Property type checks
 * @type {Object}
 */
NotificationContent.propTypes = {
  /**
   * Classes, can be used to override css styles
   */
  classes: PropTypes.object.isRequired,
  /**
   * Message object to be displayed
   * @public
   */
  messages: PropTypes.object,
  /**
   * Variant of notification
   * @public
   */
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
  /**
   * Callback to close the content
   * @callback
   */
  onClose: PropTypes.func
}

export default withStyles(styles)(NotificationContent)
