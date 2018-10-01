/**
 * @prettier
 * @description: DeleteButton
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button/Button'
import { withStyles } from '@material-ui/core/styles'

// custom component
import AlertDialog from '../dialogs/AlertDialog'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
})

/**
 * DeleteButton using AlertDialog to confirm deletions
 * @class
 * @constructor
 * @public
 */
class DeleteButton extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   */
  static propTypes = {
    /**
     * Classes, can be used to override css styles
     */
    classes: PropTypes.object.isRequired,
    /**
     * Variant of the button
     */
    variant: PropTypes.string.isRequired,
    /**
     * Color of the button
     */
    color: PropTypes.string.isRequired,
    /**
     * Delete confirmation message
     */
    message: PropTypes.string.isRequired,
    /**
     * Callback function
     */
    onRemove: PropTypes.func.isRequired,
  }

  /**
   * Default prop types
   * @type {Object}
   */
  static defaultProps = {
    variant: 'outlined',
    color: 'secondary',
    message: 'Delete ?'
  }

  /**
   * Set initial state
   * @type {Object}
   */
  state = {
    open: false
  }

  /**
   * Event handler - onClick event
   */
  handleOpen = () => {
    this.setState({ open: true })
  }

  /**
   * Event handler - onClose event
   */
  handleClose = () => {
    this.setState({ open: false })
  }

  /**
   * Handles the response from the dialog component
   * @param {boolean} confirm - flag indicate if delete is confirmed or not
   */
  handleConfirmation = confirm => {
    if (confirm) {
      this.props.onRemove()
    }
    this.setState({ open: false })
  }

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    const { classes, variant, color, message } = this.props
    return (
      <div>
        <AlertDialog
          open={this.state.open}
          message={message}
          onClose={this.handleClose}
          onResponse={this.handleConfirmation}
        />
        <Button className={classes.root} variant={variant} color={color} onClick={this.handleOpen}>
          Delete
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(DeleteButton)
