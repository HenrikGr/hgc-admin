/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import Snackbar from 'material-ui/Snackbar';

/**
 * Positioned snack bar component
 */
class PositionedSnackbar extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    vertical: PropTypes.oneOf(['top', 'bottom']),
    horizontal: PropTypes.oneOf(['left', 'right', 'center']),
  };

  static defaultProps = {
    open: false,
    message: 'default message',
    vertical: 'top',
    horizontal: 'center',
  };

  state = {
    open: false,
    message: '',
    vertical: null,
    horizontal: null,
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { open, message, vertical, horizontal } = nextProps;
    if (open) {
      this.setState({open: open, message: message, vertical: vertical, horizontal: horizontal});
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { vertical, horizontal, open, message } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;