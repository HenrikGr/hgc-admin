/**
 * Description: Refresh session modal dialog component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Modal from "material-ui/Modal";
import Button from "material-ui/Button";

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
 * RefreshSession modal component
 */
class RefreshSession extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    onRefresh: PropTypes.func
  };

  state = {
    open: false
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { open } = nextProps;
    if (open && !this.state.open) {
      this.setState({ open: true });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = event => {
    this.setState({ open: false });
    if (this.props.onClose) {
      this.props.onClose(event);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={this.state.open}
        onClose={this.handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="title" id="modal-title">
            You session is going to expire.
          </Typography>
          <Typography variant="subheading" id="simple-modal-description">
            Click refresh button to extend your session
          </Typography>
          <Button
            onClick={() => {
              this.handleClose("remove");
            }}
          >
            Logout
          </Button>
          <Button
            onClick={() => {
              this.handleClose("refresh");
            }}
          >
            Refresh
          </Button>
          <RefreshSessionModal />
        </div>
      </Modal>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const RefreshSessionModal = withStyles(styles)(RefreshSession);

export default RefreshSessionModal;
