/**
 * @prettier
 * @description: Dialog to view or generate new client secrets
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import Dialog from '@material-ui/core/Dialog/index'
import DialogActions from '@material-ui/core/DialogActions/index'
import DialogContent from '@material-ui/core/DialogContent/index'
import DialogContentText from '@material-ui/core/DialogContentText/index'
import DialogTitle from '@material-ui/core/DialogTitle/index'
import Tooltip from '@material-ui/core/Tooltip/index'
import IconButton from '@material-ui/core/IconButton/index'
import FeedbackIcon from '@material-ui/icons/Feedback'
import TextField from '@material-ui/core/TextField/index'

// custom components
import CloseButton from '../../components/buttons/CloseButton'
import GenerateSecretsButton from '../../components/buttons/GenerateSecretsButton'

import { clientMgr } from '../../../domain/entity'

/**
 * ClientSecretsDialog component
 */
class ClientSecretsDialog extends React.PureComponent {
  /**
   * Property type checks
   * @type {Object}
   */
  static propTypes = {
    /**
     * Client entity object
     */
    client: PropTypes.object.isRequired
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
    clientMgr
      .getClientSecret(this.props.client.name)
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
    clientMgr
      .generateClientSecret(this.props.client.name)
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
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Client secrets</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Client Id and Client Secret are values you should copy and use in you own app. If there are no
              value, you could generate new values once.
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
            {!this.state.clientId ? (
              <React.Fragment>
                <GenerateSecretsButton onClick={this.handleGenerateSecrets}>
                  Generate secrets
                </GenerateSecretsButton>
                <CloseButton onClick={this.handleClose} />
              </React.Fragment>
            ) : (
              <CloseButton onClick={this.handleClose} />
            )}
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ClientSecretsDialog
