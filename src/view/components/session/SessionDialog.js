/**
 * @prettier
 * @description: Modal dialog that provides a means for the user to either
 * - refresh a token, extending the session,
 * - remove token, logging out.
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import { LogOutLink } from '../links/index'

/**
 * Helper function to calculate center position in viewport for the modal dialog
 * @returns {{top: string, left: string, transform: string}}
 */
function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

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
   */
  static propTypes = {
    /**
     * Classes to extends style
     * @private
     */
    classes: PropTypes.object.isRequired,
    /**
     * Flag for open the modal or notSession context
     * @private
     */
    open: PropTypes.bool,
    /**
     * Callback function to refresh a token
     * @private
     */
    onRefresh: PropTypes.func,
    /**
     * Callback to remove a token
     */
    onRemove: PropTypes.func
  }

  /**
   * Render the modal dialog
   * @returns {*}
   */
  render() {
    const { classes, open, onRefresh, onRemove } = this.props
    const openDlg = open !== undefined ? open : false

    return (
      <Modal
        aria-labelledby="refresh session"
        aria-describedby="refresh session modal dialog"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={openDlg}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="title" id="refresh-dialog-title">
            You session is going to expire!
          </Typography>
          <Typography variant="subheading" id="refresh-dialog-description">
            Click refresh button to extend your session or logout.
          </Typography>
          <Button component={LogOutLink} to="/login" onClick={onRemove}>
            Log out
          </Button>
          <Button onClick={onRefresh}>Refresh</Button>
          <SessionDialogWrapped />
        </div>
      </Modal>
    )
  }
}

// We need an intermediary variable for handling the recursive nesting.
const SessionDialogWrapped = withStyles(styles)(SessionDialog)

// Inject token context
export default SessionDialogWrapped
