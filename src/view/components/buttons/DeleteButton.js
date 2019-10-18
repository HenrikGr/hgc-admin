/**
 * @prettier
 * @description: DeleteButton with confirmation alert
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button/Button'
import { withStyles } from '@material-ui/core/styles'

// custom component
import AlertDialog from '../dialogs/AlertDialog'

/**
 * Component styles
 * @param theme
 * @returns {{root: {margin: (number|string)}}}
 */
const styles = theme => ({
  root: {
    margin: theme.spacing(1)
  }
})

/**
 * DeleteButton with confirmation alert
 */
class DeleteButton extends React.PureComponent {
  /**
   * Component props
   * @type {{classes: *, variant: *, color: *, message: *, onClick: *}}
   */
  static propTypes = {
    /**
     * Classes, can be used to override css styles
     */
    classes: PropTypes.object.isRequired,
    /**
     * Variant of the button
     */
    variant: PropTypes.string,
    /**
     * Color of the button
     */
    color: PropTypes.string.isRequired,
    /**
     * Delete confirmation message
     */
    message: PropTypes.string.isRequired,
    /**
     * Callback function to be called if deletion is confirmed
     */
    onClick: PropTypes.func.isRequired
  }

  /**
   * Default props
   * @type {{variant: string, color: string, message: string}}
   */
  static defaultProps = {
    variant: 'outlined',
    color: 'primary',
    message: 'Delete ?'
  }

  /**
   * Initial state
   * @type {{open: boolean}}
   */
  state = {
    open: false
  }

  /**
   * Event handler - Button onClick event
   */
  handleOpenAlert = () => {
    this.setState({ open: true })
  }

  /**
   * Event handler for the onClose event of the alert dialog
   * Trigger the alert dialog to close
   */
  handleCloseAlert = () => {
    this.setState({ open: false })
  }

  /**
   * Event handler - AlertDialog onClose event
   * @param {boolean} confirm - boolean response from AlertDialog
   */
  handleConfirmation = confirm => {
    if (confirm) {
      this.props.onClick()
    }

    this.setState({ open: false })
  }

  /**
   * Render component
   * @returns {*}
   */
  render() {
    const { classes, variant, color, message } = this.props
    return (
      <div>
        <AlertDialog
          open={this.state.open}
          message={message}
          onClose={this.handleCloseAlert}
          onConfirm={this.handleConfirmation}
        />
        <Button
          className={classes.root}
          variant={variant}
          color={color}
          onClick={this.handleOpenAlert}
        >
          Delete
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(DeleteButton)
