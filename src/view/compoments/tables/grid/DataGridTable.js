/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// module dependencies
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table from "material-ui/Table";

// custom grid table components
import DataGridTableHeader from "./DataGridTableHeader";
import DataGridTableBody from "./DataGridTableBody";
import DataGridTableFooter from './DataGridTableFooter';

const styles = theme => ({
  root: {
    overflowX: "auto"
  },
  table: {
    //minWidth: 900,
  }
});

/**
 * DataGridTable component
 */
class DataGridTable extends React.Component {

  /**
   * Prop types API
   */
  static propTypes = {

    /**
     * Classes property to customize the style
     */
    classes: PropTypes.object.isRequired,

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
     * Can be used to override the default sort order
     * Default is ascending
     */
    order: PropTypes.string,

    /**
     * Can be used to specify which column should be sorted
     */
    orderBy: PropTypes.string,

    /**
     * Current page
     */
    page: PropTypes.number,

    /**
     * Number of rows per page
     */
    rowsPerPage: PropTypes.number,

    onRequestSort: PropTypes.func.isRequired,
    onSelectAll : PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeRowPerPage: PropTypes.func.isRequired,
  };

  /**
   * Default prop values
   */
  static defaultProps = {
    rows: []
  };

  /**
   * Handle sorting request
   * @param property
   */
  handleRequestSort = property => event => {
    this.props.onRequestSort(property);
  };

  /**
   * Handle select all rows
   * @param event
   * @param checked
   */
  handleSelectAll = (event, checked) => {
    this.props.onSelectAll(checked);
  };

  /**
   * Handle selection of a row
   * @param event
   * @param id
   */
  handleSelect = (event, id) => {
    this.props.onSelect(id);
  };

  /**
   * Handle page changes
   * @param page
   */
  handleChangePage = (page) => {
    this.props.onChangePage(page);
  };


  /**
   * Handle row per page changes
   * @param value
   */
  handleChangeRowsPerPage = value => {
    this.props.onChangeRowPerPage(value);
  };


  render() {
    const {
      classes,
      model,
      rows,
      selectedIds,
      rowId,
      order,
      orderBy,
      page,
      rowsPerPage
    } = this.props;

    return (
      <div className={classes.root}>
        <Table className={classes.table}>

          <DataGridTableHeader
            model={model}
            order={order}
            orderBy={orderBy}
            numSelected={selectedIds.length}
            rowCount={rows.length}
            onRequestSort={this.handleRequestSort}
            onSelectAll={this.handleSelectAll}
          />

          <DataGridTableBody
            model={model}
            rowId={rowId}
            rows={rows}
            selectedIds={selectedIds}
            page={page}
            rowsPerPage={rowsPerPage}
            onSelect={this.handleSelect}
          />

          <DataGridTableFooter
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />

        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(DataGridTable);
