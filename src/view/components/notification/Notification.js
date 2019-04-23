/**
 * @prettier
 * @description: Notification container component
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import NotificationContent from './NotificationContent'
import { RESET_ERROR } from '../../../store/constants'

function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

/**
 * Notification component
 * @class
 * @public
 */
class Notification extends React.PureComponent {
  /**
   * Property type checks
   * @type {Object}
   */
  static propTypes = {
    /**
     * Vertical anchor position
     * @public
     */
    vertical: PropTypes.string.isRequired,
    /**
     * Horizontal anchor position
     * @public
     */
    horizontal: PropTypes.string.isRequired,
    /**
     * Delay before auto hide
     * @public
     */
    autoHideDuration: PropTypes.number.isRequired,
    /**
     * Default message for unexpected errors
     * @public
     */
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
    /**
     * Error
     * @public
     */
    error: PropTypes.object,
    /**
     * Callback to reset error
     * @callback
     */
    onReset: PropTypes.func
  }

  /**
   * Default properties
   * @type {{vertical: string, horizontal: string, autoHideDuration: number, variant: string, messages: {}}}
   * @private
   */
  static defaultProps = {
    vertical: 'top',
    horizontal: 'center',
    autoHideDuration: 1000 * 6, // 6 seconds
    variant: 'error',
  }

  /**
   * Event handle to close snack bar
   * @param event
   * @param reason
   */
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: this.props.vertical,
          horizontal: this.props.horizontal
        }}
        open={!isEmpty(this.props.error)}
        autoHideDuration={this.props.autoHideDuration}
        onClose={this.handleClose}
      >
        { !isEmpty(this.props.error) ? (
          <NotificationContent
            variant={this.props.variant}
            messages={this.props.error}
            onClose={this.handleClose}
          />
        ) : null}
      </Snackbar>
    )
  }
}

/**
 * Map state to props
 * @param state
 * @returns {{messages: *}}
 */
const mapStateToProps = state => ({
  error: state.error
})

const mapDispatchToProps = dispatch => {
  return {
    onReset: () => {
      dispatch({ type: RESET_ERROR })
    }
  }
}

// Connect mapped state to component properties
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
