/**
 * Description: DataGridFilterColumns component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react';
import PropTypes from "prop-types";

// material-ui
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { withStyles } from "@material-ui/core/styles";

// Helper utilities for arrays
import { arrayEqual, arrayVisibleEqual } from '../../../utils/helper'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  spacer: {
    flex: '1 1 100%',
  },
});

/**
 * DataGridFilterColumns
 */
class DataGridFilterColumns extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes property to customize the style
     */
    classes: PropTypes.object.isRequired,
    /**
     * Current column model
     */
    model: PropTypes.array.isRequired,

    columns: PropTypes.array,

    checkedColumns: PropTypes.array,

    /**
     *  Callback to change visible columns
     */
    onChangedColumns: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
    previousModel: [],
    checked: [],
    defaultChecked: [],
  };


  /**
   * Calculate visible columns based on the model.
   * We check if visible key has changed in the model and if so,
   * create arrays to hold the id values in two arrays.
   * - checked, is used to render checkbox
   * - defaultChecked, is used as reference to detect changes while the menu is open.
   *
   * We are also storing the model to be able identify visible prop changes.
   * @param props
   * @param state
   * @returns {*}
   */
  static getDerivedStateFromProps(props, state) {
    if (!arrayVisibleEqual(props.model)(state.previousModel)) {
      const visibleColumns = props.model.filter(entry => entry.visible);
      return {
        previousModel: props.model,
        checked: visibleColumns.map(entry => entry.id),
        defaultChecked: visibleColumns.map(entry => entry.id),
      }
    }

    return null
  }

  /**
   * Event handler when opening the menu
   * @param event
   */
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };


  /**
   * Event handler for closing the menu
   * @param event
   */
  handleClose = event => {
    // If changes made pass the changes to the parent component
    // that will deal with updating the model.
    if (!arrayEqual(this.state.defaultChecked)(this.state.checked)) {
      this.props.onChangedColumns(this.state.checked)
    }

    this.setState({ anchorEl: null });
  };


  /**
   * Event handler for toggle checkboxes
   * @param value
   * @returns {Function}
   */
  handleToggle = value => event => {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    // Add or remove value from newChecked array
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };


  render() {
    const { classes, model } = this.props;
    const { anchorEl, checked } = this.state;

    return (
      <div className={ classes.root }>
        <IconButton
          aria-owns={ anchorEl ? 'simple-menu' : null }
          aria-haspopup="true"
          aria-label="Filter list"
          onClick={ this.handleClick }
        >
          <Tooltip title="Filter list">
            <FilterListIcon/>
          </Tooltip>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={ anchorEl }
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={ Boolean(anchorEl) }
          onClose={ this.handleClose }
        >
          { model.map((entry, index) => (
            <ListItem
              disabled={ entry.required }
              key={ index }
              role={ undefined }
              dense
              button
              onClick={ this.handleToggle(entry.id) }
            >
              <Checkbox
                disabled={ entry.required }
                checked={ checked.indexOf(entry.id) !== -1 }
                tabIndex={ -1 }
                disableRipple
              />
              <ListItemText primary={ entry.label }/>
            </ListItem>
          ))}
        </Menu>
      </div>
    )
  }
}

export default withStyles(toolbarStyles)(DataGridFilterColumns);
