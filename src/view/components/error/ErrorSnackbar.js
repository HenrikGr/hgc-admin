/**
 * Description: Error component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
    color: theme.palette.error.main,
  },
  message: {
    textAlign: 'left',
  }
});

/**
 * ErrorSnackbar
 */
class ErrorSnackbar extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes property to customize the style
     */
    classes: PropTypes.object.isRequired,
    /**
     * Default message for unexpected errors
     */
    defaultMessage: PropTypes.string,
    /**
     * Error object
     */
    error: PropTypes.object,
    /**
     * Callback to reset error
     */
    onResetError: PropTypes.func,
  };

  static defaultProps = {
    defaultMessage: 'Error, contact your system admin.',
    error: {},
  };

  state = {
    open: false,
  };

  /**
   * Check if error
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const { error } = nextProps;
    if( error.message ) {
      return {
        open: true
      }
    }
    return null;
  }

  /**
   * Event handler to close snackbar and reset error
   * @param event
   * @param reason
   */
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.onResetError();
    this.setState({ open: false });
  };

  capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  getMessage = error => {
    let msg = this.props.defaultMessage;
    for (const [key, value] of Object.entries(error)) {
      if (key === 'message') {
        msg = '<div style="text-align: center">' + value + '</div></br>';
      } else {
        msg = msg + '<div>' + this.capitalizeFirstLetter(key) + ': ' + value +'</div>';
      }
    }

    return msg;
  };

  render() {
    const { classes, error } = this.props;
    const message = error.message !== undefined ? (
      <div id="message-id"
        dangerouslySetInnerHTML={{ __html: this.getMessage(error) }} />
    ) : null;

    return (
      <Snackbar
        classes={{
          root: classes.message,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={ this.state.open }
        autoHideDuration={ 6000 }
        onClose={ this.handleClose }
        snackbarcontentprops={{ 'aria-describedby': 'message-id' }}
        message={ message }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={ classes.close }
            onClick={ this.handleClose }
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

// Inject styles
export default withStyles(styles)(ErrorSnackbar);