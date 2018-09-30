/**
 * @prettier
 * @description: AlertDialog
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from "react";
import PropTypes from "prop-types";

// material-ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
//import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from '@material-ui/core/withMobileDialog';

/**
 * AlertDialog controlled component
 * @param open
 * @param message
 * @param onClose
 * @param onResponse
 * @returns {*}
 * @constructor
 */
function AlertDialog({ open, message, onClose, onResponse }) {
  return(
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onResponse(false)} color="primary">
          Disagree
        </Button>
        <Button onClick={() => onResponse(true)} color="primary" autoFocus>
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  )
}

/**
 * Property type check
 * @type {Object}
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
   * onResponse callback
   */
  onResponse: PropTypes.func.isRequired,
}

export default withMobileDialog()(AlertDialog);
