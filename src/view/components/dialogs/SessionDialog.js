/**
 * Description: Modal dialog that provides a means for the user to either
 * - refresh a token, extending the session,
 * - remove token, logging out.
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
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

// custom links
import { LogOutLink } from "../links/index";

// Token context consumer as a HOC
import withTokenContext from '../../providers/withTokenContext'

/**
 * Helper function to calculate center position in viewport for the modal dialog
 * @returns {{top: string, left: string, transform: string}}
 */
function getModalStyle() {
  const top = 50 ;
  const left = 50;

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
 * A modal dialog component to refresh or remove token
 * @class SessionDialog
 * @constructor
 * @public
 */
class SessionDialog extends React.PureComponent {
  /**
   * Property type check
   * @type {Object}
   * @private
   */
  static propTypes = {
    /**
     * Classes to extends style
     * @type {object}
     * @private
     */
    classes: PropTypes.object.isRequired,
    /**
     * Token context
     * @type {object}
     * @private
     * @exception Can not set isRequired checking, could be a bug
     */
    context: PropTypes.object,
  };

  /**
   * Sets initial component state
   * @type {Object}
   * @private
   */
  state = {
    open: false,
  };

  /**
   * Event handler for the refresh button
   * @type {function}
   * @private
   */
  handleRefreshSession = () => {
    this.props.context.refreshToken();
  };

  /**
   * Event handler for the remove button
   * @type {function}
   * @private
   */
  handleRemoveSession = () => {
    this.props.context.removeToken();
  };

  /**
   * Event handler when modal dialog closes
   * @type {function}
   * @private
   */
  handleClose = () => {
    this.setState({ open: false });
  };

  /**
   * Render the modal dialog
   * @returns {*}
   */
  render() {
    const { classes, context } = this.props;
    const openDlg = context !== undefined ? context.refreshState : false;

    return (
      <Modal
        aria-labelledby="refresh session"
        aria-describedby="refresh session modal dialog"
        disableBackdropClick={ true }
        disableEscapeKeyDown={ true }
        open={ openDlg }
        onClose={ this.handleClose }
      >
        <div style={ getModalStyle() } className={ classes.paper }>
          <Typography variant="title" id="refresh-dialog-title">
            You session is going to expire!
          </Typography>
          <Typography variant="subheading" id="refresh-dialog-description">
            Click refresh button to extend your session or logout.
          </Typography>
          <Button
            component={ LogOutLink }
            to="/login"
            onClick={ this.handleRemoveSession }
          >
            Log out
          </Button>
          <Button
            onClick={ this.handleRefreshSession }
          >
            Refresh
          </Button>
          <SessionDialogWrapped />
        </div>
      </Modal>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const SessionDialogWrapped = withStyles(styles)(SessionDialog);

// Inject token context
export default withTokenContext(SessionDialogWrapped)

