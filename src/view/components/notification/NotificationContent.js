/**
 * Description: Notification container component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// material-ui
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

// helper
import { capitalizeFirstLetter } from "../../../utils/stringHelper";

// Variant icons
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    //alignItems: 'center',
  },
});

/**
 * Helper function to transform error object into HTML
 * @param messages
 * @returns {string}
 */
const getMessage = messages => {
  let msg = '';
  for (const [key, value] of Object.entries(messages)) {
    if (key === 'message') {
      msg = '<div>' + value + '</div></br>';
    } else {
      msg = msg + '<div>' + capitalizeFirstLetter(key) + ' ' + value +'</div>';
    }
  }
  return msg;
};


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
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <div id="client-snackbar" className={ classes.message }>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          <div
            id="message-id"
            dangerouslySetInnerHTML={{ __html: getMessage(messages) }}
          >
          </div>
        </div>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={ classes.close }
          onClick={ onClose }
        >
          <CloseIcon className={ classes.icon } />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

NotificationContent.propTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.object,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles)(NotificationContent);