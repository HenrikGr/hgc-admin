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
import PropTypes from "prop-types";
import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

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
     * Number of selected rows
     */
    numSelected: PropTypes.number.isRequired,

    /**
     * Number of rows
     */
    rowCount: PropTypes.number.isRequired,


    onRequestSort: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
  };

  render() {
    const {
      model,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
      onSelectAll
    } = this.props;

    return (
      <TableHead>
        <TableRow>

          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected > 0 && numSelected === rowCount}
              onChange={onSelectAll}
            />
          </TableCell>

          {model.map(entry => {
            return entry.visible && (
              <TableCell
                key={entry.id}
                numeric={entry.type === 'number'}
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