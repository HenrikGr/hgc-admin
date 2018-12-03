/**
 * @prettier
 * @description: HGC Oauth2 server
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import FeedbackIcon from '@material-ui/icons/Feedback'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

/**
 * DisplaySecretsDialog component
 * @class
 * @public
 */
class DisplaySecretsDialog extends React.PureComponent {
  /**
   * Property type checks
   * @type {Object}
   */
  static propTypes = {
    /**
     * Entity object
     */
    entity: PropTypes.object.isRequired,
    /**
     * Callback function to fetch secrets
     */
    getSecrets: PropTypes.func.isRequired,
    /**
     * Callback function to generate secrets
     */
    generateSecrets: PropTypes.func.isRequired,
  }

  /**
   * Initial state
   * @type {Object}
   */
  state = {
    open: false,
    clientId: '',
    clientSecret: ''
  }

  handleClose = () => {
    this.setState({ open: false, clientId: '', clientSecret: '' })
  }

  handleGetSecrets = () => {
    this.props.getSecrets(this.props.entity.name)
      .then(data => {
        this.setState({
          open: true,
          clientId: data.clientId ? data.clientId : '',
          clientSecret: data.clientSecret ? data.clientSecret : ''
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleGenerateSecrets = () => {
    this.props.generateSecretsByName(this.props.entity.name)
      .then(data => {
        this.setState({
          open: true,
          clientId: data.clientId ? data.clientId : '',
          clientSecret: data.clientSecret ? data.clientSecret : ''
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <Tooltip title="Display secrets">
          <IconButton aria-label="Display secrets" onClick={this.handleGetSecrets}>
            <FeedbackIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Client secrets</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Client Id and Client Secret are values you should copy and use in you own app
            </DialogContentText>
            <TextField
              disabled
              margin="dense"
              id="clientId"
              label="Client ID"
              type="text"
              value={this.state.clientId}
              fullWidth
            />
            <TextField
              disabled
              margin="dense"
              id="clientSecret"
              label="Client Secret"
              value={this.state.clientSecret}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            { !this.state.clientId ? (
              <Button onClick={this.handleGenerateSecrets} color="primary">
                Generate secrets
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default DisplaySecretsDialog
