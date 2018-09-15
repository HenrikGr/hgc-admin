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
import { RESET_ERROR } from '../../../store/actions/constants'

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
     * messages object
     * @public
     */
    messages: PropTypes.object,
    /**
     * Callback to reset messages
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
    messages: {}
  }

  /**
   * Initial state
   * @type {{open: boolean}}
   */
  state = {
    open: false
  }

  /**
   * Ensure the snackbar opens when new messages arrived
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.messages !== prevProps.messages) {
      if (this.props.messages.message) {
        this.setState({ open: true })
      } else {
        this.setState({ open: false })
      }
    }
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

    this.setState({ open: false })

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
        open={this.state.open}
        autoHideDuration={this.props.autoHideDuration}
        onClose={this.handleClose}
      >
        <NotificationContent
          variant={this.props.variant}
          messages={this.props.messages}
          onClose={this.handleClose}
        />
      </Snackbar>
    )
  }
}

/**
 * Map isFetching state to prop
 * @param state
 * @returns {{isFetching: *}}
 */
const mapStateToProps = state => ({
  messages: state.error
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
