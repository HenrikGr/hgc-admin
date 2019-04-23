/**
 * Description: DataGridTableHeader component
 *
 * The purpose of the component is to provide table scoped services such as
 * - sorting columns
 * - indeterminate checkbox to select all rows
 * TODO: Add filter, search, categorize, etc.
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
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * DataGridTableHeader
 */
class DataGridTableHeader extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Model data for columns in the table and the form
     */
    model: PropTypes.array.isRequired,
    /**
     * Can be used to override the default sort order
     * Default is ascending
     */
    order: PropTypes.string,
    /**
     * Can be used to specify which column should be sorted
     */
    orderBy: PropTypes.string,
    /**
     * Allow multi selection
     */
    multiSelect: PropTypes.bool.isRequired,
    /**
     * Number of selected rows
     */
    numSelected: PropTypes.number.isRequired,
    /**
     * Number of rows
     */
    rowCount: PropTypes.number.isRequired,
    /**
     * Callback function for sort request
     */
    onRequestSort: PropTypes.func.isRequired,
    /**
     * Callback function for select all
     */
    onSelectAll: PropTypes.func.isRequired,
  };

  render() {
    const {
      model,
      order,
      orderBy,
      multiSelect,
      numSelected,
      rowCount,
      onRequestSort,
      onSelectAll
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            { multiSelect && (
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected > 0 && numSelected === rowCount}
                onChange={onSelectAll}
              />
            )}
          </TableCell>

          {model.map(entry => {
            return entry.visible && (
              <TableCell
                key={entry.id}
                align={entry.type === 'number' ? 'left' : 'center'}
                padding={entry.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === entry.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={entry.type === 'number' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === entry.id}
                    direction={order}
                    onClick={onRequestSort(entry.id)}
                  >
                    {entry.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default DataGridTableHeader;