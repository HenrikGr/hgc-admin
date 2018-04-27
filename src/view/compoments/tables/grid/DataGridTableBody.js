/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// module dependencies
import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Icon from 'material-ui/Icon';

/**
 * DataGridTableBody component
 */
class DataGridTableBody extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Model data for columns in the table and the form
     */
    model: PropTypes.array.isRequired,
    /**
     * Can be used to override identifier prop name in supplied rows
     * Default is '_id'
     */
    rowId: PropTypes.string,
    /**
     * Array of data objects matching the model data for the columns
     */
    rows: PropTypes.array.isRequired,
    /**
     * Array of selected row ids
     */
    selectedIds: PropTypes.array.isRequired,
    /**
     * Current page
     */
    page: PropTypes.number,
    /**
     * Number of rows per page
     */
    rowsPerPage: PropTypes.number,
    /**
     * Callback function to handle selection
     */
    onSelect: PropTypes.func.isRequired,
  };

  handleKeyDownSelect = (event, id) => {
    if (keycode(event) === 'space') {
      this.props.onSelect(event, id);
    }
  };

  handleSelect = (event, id) => {
    this.props.onSelect(event, id);
  };

  getIcon = value => {
    if (value) {
      return( <Icon color="action">check_box</Icon> )
    } else {
      return( <Icon color="disabled">check_box_outline_blank</Icon> )
    }
  };

  getValue = (value, type) => {
    switch (type) {
      case 'password':
        return '******';
      case 'checkbox':
        return this.getIcon(value);
      default:
        return value;
    }
  };

  render() {
    const { model, rowId, rows, selectedIds, page, rowsPerPage } = this.props;
    const begin = page * rowsPerPage;
    const end = page * rowsPerPage + rowsPerPage;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <TableBody>
        {rows.slice(begin, end).map(row => {
          return (
            <TableRow
              hover
              onClick={event => this.handleSelect(event, row[rowId])}
              onKeyDown={event => this.handleKeyDownSelect(event, row[rowId])}
              role="checkbox"
              aria-checked={selectedIds.indexOf(row[rowId]) !== -1}
              tabIndex={-1}
              key={row[rowId]}
              selected={selectedIds.indexOf(row[rowId]) !== -1}
            >
              <TableCell
                padding="checkbox"
              >
                <Checkbox
                  checked={selectedIds.indexOf(row[rowId]) !== -1}
                />
              </TableCell>

              {model.map((entry, index) => {
                return entry.visible && (
                  <TableCell
                    key={index}
                    numeric={entry.type === 'numeric'}
                    padding={entry.disablePadding ? 'none' : 'default'}
                  >
                    {this.getValue(row[entry.id], entry.type)}
                  </TableCell>
                )
              })}
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
  }
}


export default DataGridTableBody;