/**
 * Description
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";

// material-ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from '@material-ui/core/withMobileDialog';

/**
 * AlertDialog component
 */
class AlertDialog extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
    onResponse: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: 'Title',
    message: 'message ....?',
    cancel: 'Disagree',
    confirm: 'Accept',
  };

  state = {
    open: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirmation = (confirm) => {
    this.props.onResponse(confirm);
    this.setState({ open: false });
  };

  render() {
    const { open, title, message, cancel, confirm } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleConfirmation(false)} color="primary">
              {cancel}
            </Button>
            <Button onClick={() => this.handleConfirmation(true)} color="primary" autoFocus>
              {confirm}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(AlertDialog);
