/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react etc...
import React from "react";
import PropTypes from "prop-types";
import keycode from "keycode";

// Material-ui
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

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
    onSelect: PropTypes.func.isRequired
  };

  /**
   * Event handler for key down select
   * @param event
   * @param id
   */
  handleKeyDownSelect = (event, id) => {
    if (keycode(event) === "space") {
      this.props.onSelect(event, id);
    }
  };

  /**
   * Event handler for select
   * @param event
   * @param id
   */
  handleSelect = (event, id) => {
    this.props.onSelect(event, id);
  };

  /**
   * Render helpers function for different data types
   * TODO: Add inline editing capability
   * @param value
   * @param type
   * @returns {*}
   */
  getValue = (value, type) => {
    switch (type) {
      case "password":
        return "******";
      case "checkbox":
        return (
          <Checkbox
            disabled={true}
            checked={value}
          />
        );
      default:
        return value;
    }
  };

  /**
   * Get number of visible columns
   * @param model
   * @returns {*}
   */
  countVisibleColumns = model => model.filter(v => v.visible).length;

  render() {
    const { model, rowId, rows, selectedIds, page, rowsPerPage } = this.props;
    const begin = page * rowsPerPage;
    const end = page * rowsPerPage + rowsPerPage;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    const numOfColumn = this.countVisibleColumns(model) + 1;

    return (
      <TableBody>
        {rows.slice(begin, end).map(row => {
          return (
            <TableRow
              key={row[rowId]}
              hover
              role="checkbox"
              tabIndex={-1}
              aria-checked={selectedIds.indexOf(row[rowId]) !== -1}
              selected={selectedIds.indexOf(row[rowId]) !== -1}
              onClick={event => this.handleSelect(event, row[rowId])}
              onKeyDown={event => this.handleKeyDownSelect(event, row[rowId])}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={selectedIds.indexOf(row[rowId]) !== -1} />
              </TableCell>

              {model.map((entry, index) => {
                return (
                  entry.visible && (
                    <TableCell
                      key={index}
                      align={entry.type === 'number' ? 'left' : 'center'}
                      padding={entry.disablePadding ? "none" : "default"}
                    >
                      {this.getValue(row[entry.id], entry.type)}
                    </TableCell>
                  )
                );
              })}
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={numOfColumn} />
          </TableRow>
        )}
      </TableBody>
    );
  }
}

export default DataGridTableBody;
