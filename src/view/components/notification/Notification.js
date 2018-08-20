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

// material-ui
import Snackbar from '@material-ui/core/Snackbar';

// custom component
import NotificationContent from './NotificationContent'

/**
 * Notification
 */
class Notification extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Vertical anchor position
     */
    vertical: PropTypes.string.isRequired,
    /**
     * Horizontal anchor position
     */
    horizontal: PropTypes.string.isRequired,
    /**
     * Delay before auto hide
     */
    autoHideDuration: PropTypes.number.isRequired,
    /**
     * Default message for unexpected errors
     */
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
    /**
     * messages object
     */
    messages: PropTypes.object,
    /**
     * Callback to reset messages
     */
    onResetMessages: PropTypes.func,
  };

  static defaultProps = {
    vertical: 'top',
    horizontal: 'center',
    autoHideDuration: 1000 * 6, // 6 seconds
    variant: 'error',
    messages: {},
  };

  /**
   * Initial state
   * @type {{open: boolean}}
   */
  state = {
    open: false,
  };

  /**
   * Ensure the snackbar opens when new error message arrived
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages !== prevProps.messages) {
      if (this.props.messages.message) {
        this.setState({open: true})
      } else {
        this.setState({open: false})
      }
    }
  }

  /**
   * Event handle to close error snack bar
   * @param event
   * @param reason
   */
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // Reset error object
    this.props.onResetMessages();
    this.setState({ open: false });
  };

  render() {
    return(
      <Snackbar
        anchorOrigin={{
          vertical: this.props.vertical,
          horizontal: this.props.horizontal,
        }}
        open={ this.state.open }
        autoHideDuration={ this.props.autoHideDuration }
        onClose={ this.handleClose }
      >
        <NotificationContent
          variant={ this.props.variant }
          messages={ this.props.messages }
          onClose={ this.handleClose }
        />
      </Snackbar>

    )
  }
}

export default Notification;