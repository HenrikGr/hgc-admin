/**
 * Description: Refresh session modal dialog component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// material-ui
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

/**
 * Helper function
 * @returns {number}
 */
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

/**
 * RefreshSessionDialog modal component
 */
class RefreshSessionDialog extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes, can be used to override css styles
     */
    classes: PropTypes.object.isRequired,
    /**
     * Callback function to deal with closing modal dialog
     */
    onClose: PropTypes.func,
  };

  state = {
    open: false
  };

  /**
   * Check if open props is passed in and the modal dialog should be opened.
   * @param props
   * @param state
   * @returns {*}
   */
  static getDerivedStateFromProps(props, state) {
    if (props.open && !state.open) {
      return { open: true }
    } else {
      return { open: false }
    }
  }

  /**
   * Event handler when dialog closes
   * @param action
   */
  handleClose = action => {
    this.setState({ open: false });
    if (this.props.onClose) {
      this.props.onClose(action);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Modal
        aria-labelledby="refresh session"
        aria-describedby="refresh session modal dialog"
        disableBackdropClick={ true }
        disableEscapeKeyDown={ true }
        open={ this.state.open }
        onClose={ this.handleClose }
      >
        <div style={ getModalStyle() } className={ classes.paper }>
          <Typography variant="title" id="refresh-dialog-title">
            You session is going to expire.
          </Typography>
          <Typography variant="subheading" id="refresh-dialog-description">
            Click refresh button to extend your session or close to log out.
          </Typography>
          <Button
            component={ Link }
            to="/login"
            onClick={() => { this.handleClose("logout"); }}
          >
            Logout
          </Button>
          <Button
            onClick={() => { this.handleClose("refresh"); }}
          >
            Refresh
          </Button>
          <RefreshSessionDialogWrapped />
        </div>
      </Modal>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const RefreshSessionDialogWrapped = withStyles(styles)(RefreshSessionDialog);
export default RefreshSessionDialogWrapped;

