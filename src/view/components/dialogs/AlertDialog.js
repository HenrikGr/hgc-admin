/**
 * @prettier
 * @description: AlertDialog
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
//import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from '@material-ui/core/withMobileDialog'

/**
 * AlertDialog controlled component
 * @param open
 * @param message
 * @param onClose
 * @param onConfirm
 * @returns {*}
 * @constructor
 */
function AlertDialog({ open, message, onClose, onConfirm }) {
  return (
    <Dialog
      fullWidth={true}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onConfirm(true)}>
          Accept
        </Button>
        <Button autoFocus variant="outlined" color="primary" onClick={() => onConfirm(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

/**
 * Component props
 * @type {{open: *, message: *, onClose: *, onConfirm: *}}
 */
AlertDialog.propTypes = {
  /**
   * Flag to open dialog
   */
  open: PropTypes.bool.isRequired,
  /**
   * Message
   */
  message: PropTypes.string.isRequired,
  /**
   * onClose event callback
   */
  onClose: PropTypes.func.isRequired,
  /**
   * onConfirm callback
   */
  onConfirm: PropTypes.func.isRequired
}

export default withMobileDialog()(AlertDialog)
