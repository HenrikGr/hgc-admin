/**
 * @prettier
 * @description: Manage scope dialog component
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

// material-ui
import Dialog from '@material-ui/core/Dialog/index'
import DialogActions from '@material-ui/core/DialogActions/index'
import DialogContent from '@material-ui/core/DialogContent/index'
import DialogContentText from '@material-ui/core/DialogContentText/index'
import DialogTitle from '@material-ui/core/DialogTitle/index'
import Tooltip from '@material-ui/core/Tooltip/index'
import IconButton from '@material-ui/core/IconButton/index'
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined'
import TextField from '@material-ui/core/TextField/index'

// custom components
import AddButton from '../../components/buttons/AddButton'
import DeleteButton from '../../components/buttons/DeleteButton'
import CloseButton from '../../components/buttons/CloseButton'
import SelectedList from '../../components/list/SelectedList'

import { scopeMgr } from '../../../domain/entity'

/**
 * ScopeDialog component
 */
class ScopeDialog extends React.PureComponent {
  /**
   * Initial state
   * @type {{open: boolean, name: string, selectedItem: string, items: Array}}
   */
  state = {
    open: false,
    newScope: '',
    removeScope: '',
    scopes: []
  }

  /**
   * Create a ref to store the textInput DOM element
   * @type {React.RefObject<any>}
   */
  textInput = React.createRef()

  /**
   * Explicitly focus the text input using the raw DOM API
   * Note: we're accessing "current" to get the DOM node
   */
  focusTextInput = () => {
    this.textInput.current.focus()
  }

  /**
   * Helper to ensure atomic update of state
   * @param delta
   * @returns {function(*, *): {[p: string]: *}}
   */
  setSelectedScope = delta => {
    return (prevState, currProps) => {
      return {
        ...prevState,
        newScope: '',
        removeScope: prevState.removeScope === delta ? '' : delta
      }
    }
  }

  /**
   * Helper to ensure atomic update of state
   * @param delta
   * @returns {function(*, *): {[p: string]: *}}
   */
  removeScope = delta => {
    return (prevState, currProps) => {
      return {
        ...prevState,
        newScope: '',
        removeScope: '',
        scopes: prevState.scopes.filter(item => item !== delta)
      }
    }
  }

  /**
   * Helper to ensure atomic update of state
   * @param delta
   * @returns {function(*, *): {[p: string]: *}}
   */
  addScope = delta => {
    return (prevState, currProps) => {
      return {
        ...prevState,
        newScope: '',
        removeScope: '',
        scopes: [...prevState.scopes, delta]
      }
    }
  }

  /**
   * Event handler for the open dialog icon onClick event
   */
  handleClickOpen = () => {
    scopeMgr.getAllScopes().then(data => {
      this.setState({ open: true, newScope: '', removeScope: '', scopes: data })
    })
  }

  /**
   * Event handler for the dialog onClose callback event
   */
  handleClose = () => {
    this.setState({ open: false, newScope: '' })
  }

  /**
   * Event handler for the text fields onChange event
   * @param newScope
   * @returns {Function}
   */
  handleChange = newScope => event => {
    this.setState({
      [newScope]: event.target.value
    })
  }

  /**
   * Event handler that receives the selected item (scope) from the SelectedList component
   * @param removeScope
   */
  handleSelect = removeScope => {
    this.setState(this.setSelectedScope(removeScope), () => {
      if (this.state.removeScope === '') {
        this.focusTextInput()
      }
    })
  }

  /**
   * Event handler for the add button onClick event
   */
  handleAddScope = () => {
    scopeMgr
      .createScope(this.state.newScope)
      .then(data => {
        this.setState(this.addScope(data.name), () => {
          this.focusTextInput()
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  /**
   * Event handler for the delete button onClick event
   */
  handleDeleteScope = () => {
    const { removeScope } = this.state
    if (removeScope !== '') {
      scopeMgr
        .deleteScope(removeScope)
        .then(() => {
          this.setState(this.removeScope(removeScope), () => {
            this.focusTextInput()
          })
        })
        .catch(error => {
          console.log('error', error)
        })
    }
  }

  /**
   * Render component
   * @returns {*}
   */
  render() {
    return (
      <div>
        <Tooltip title="Manage scope(s)">
          <IconButton aria-label="Add scope name" onClick={this.handleClickOpen}>
            <FeedbackOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="add-remove-scope"
        >
          <DialogTitle id="add-remove-scope">Manage scope</DialogTitle>
          <DialogContent>
            <DialogContentText>Available scope(s)</DialogContentText>
            <SelectedList
              items={this.state.scopes}
              selectedItem={this.state.removeScope}
              onSelect={this.handleSelect}
            />
            <TextField
              disabled={this.state.removeScope !== ''}
              fullWidth
              autoFocus
              type="text"
              margin="dense"
              label="Scope"
              placeholder="Add new scope"
              inputRef={this.textInput}
              value={this.state.newScope}
              onChange={this.handleChange('newScope')}
            />
          </DialogContent>
          <DialogActions>
            {this.state.newScope !== '' && <AddButton color="primary" onClick={this.handleAddScope} />}
            {this.state.removeScope !== '' && (
              <DeleteButton
                message={'Do you want to delete ' + this.state.removeScope + ' ?'}
                onClick={this.handleDeleteScope}
              />
            )}
            <CloseButton variant="outlined" onClick={this.handleClose} />
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ScopeDialog
