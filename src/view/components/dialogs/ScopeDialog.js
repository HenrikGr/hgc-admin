/**
 * @prettier
 * @description: Manage scope dialog component
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'

// material-ui
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined'
import TextField from '@material-ui/core/TextField'

// custom components
import AddButton from '../buttons/AddButton'
import DeleteButton from '../buttons/DeleteButton'
import CloseButton from '../buttons/CloseButton'
import SelectedList from '../list/SelectedList'

// API service
import scopeAPI from '../../../domain/service/Scope'

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
    name: '',
    selectedItem: '',
    items: []
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
        name: '',
        selectedItem: prevState.selectedItem === delta ? '' : delta
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
        name: '',
        selectedItem: '',
        items: prevState.items.filter(item => item !== delta)
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
        name: '',
        selectedItem: '',
        items: [...prevState.items, delta]
      }
    }
  }

  /**
   * Event handler for the open dialog icon onClick event
   */
  handleClickOpen = () => {
    scopeAPI.findAllScopes().then(data => {
      this.setState({ open: true, name: '', selectedItem: '', items: data })
    })
  }

  /**
   * Event handler for the dialog onClose callback event
   */
  handleClose = () => {
    this.setState({ open: false, name: '' })
  }

  /**
   * Event handler for the text fields onChange event
   * @param name
   * @returns {Function}
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  /**
   * Event handler that receives the selected item (scope) from the SelectedList component
   * @param selectedItem
   */
  handleSelect = selectedItem => {
    this.setState(this.setSelectedScope(selectedItem), () => {
      if (this.state.selectedItem === '') {
        this.focusTextInput()
      }
    })
  }

  /**
   * Event handler for the add button onClick event
   */
  handleAddScope = () => {
    scopeAPI
      .create(this.state.name)
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
    const { selectedItem } = this.state
    if (selectedItem !== '') {
      scopeAPI
        .deleteByName(selectedItem)
        .then(() => {
          this.setState(this.removeScope(selectedItem), () => {
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
              items={this.state.items}
              selectedItem={this.state.selectedItem}
              onSelect={this.handleSelect}
            />
            <TextField
              disabled={this.state.selectedItem !== ''}
              fullWidth
              autoFocus
              type="text"
              margin="dense"
              label="Scope name"
              inputRef={this.textInput}
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
          </DialogContent>
          <DialogActions>
            {this.state.name !== '' && <AddButton color="primary" onClick={this.handleAddScope} />}
            {this.state.selectedItem !== '' && (
              <DeleteButton
                message={'Do you want to delete ' + this.state.selectedItem + ' ?'}
                onClick={this.handleDeleteScope}
              />
            )}
            <CloseButton variant="outlined" color="primary" onClick={this.handleClose} />
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default ScopeDialog
