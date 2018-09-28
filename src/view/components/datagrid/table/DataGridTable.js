/**
 * Description: DataGridTable component
 *
 * The component render the table build upon several other components
 * - DataGridTableHeader, supports column sorting and indeterminate checkbox to select all
 * - DataGridTableBody
 * - DataGridTableFooter
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from "react";
import PropTypes from "prop-types";

// material-ui
import Table from "@material-ui/core/Table";
import { withStyles } from "@material-ui/core/styles";

// custom grid table components
import DataGridTableHeader from "./DataGridTableHeader";
import DataGridTableBody from "./DataGridTableBody";
import DataGridTableFooter from './DataGridTableFooter';

const styles = {
  root: {
    overflowX: "auto"
  },
  table: {
    //minWidth: 900,
  }
};

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
    idProperty: PropTypes.string,
    /**
     * Array of data objects matching the model data for the columns
     */
    rows: PropTypes.array.isRequired,
    /**
     * Allow multi selection
     */
    multiSelect: PropTypes.bool.isRequired,
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
    /**
     * Callback for sort request
     */
    onRequestSort: PropTypes.func.isRequired,
    /**
     * Callback for multiple selections
     */
    onSelectAll : PropTypes.func.isRequired,
    /**
     * Callback for single selection
     */
    onSelect: PropTypes.func.isRequired,
    /**
     * Callback for change page
     */
    onChangePage: PropTypes.func.isRequired,
    /**
     * Callback for change rows per pages
     */
    onChangeRowPerPage: PropTypes.func.isRequired,
  };

  /**
   * EVent handler for sorting request
   * @param property
   */
  handleRequestSort = property => event => {
    this.props.onRequestSort(property);
  };

  /**
   * Event handler for multiple selections
   * @param event
   * @param checked
   */
  handleSelectAll = (event, checked) => {
    this.props.onSelectAll(checked);
  };

  /**
   * Event handler for single select
   * @param event
   * @param id
   */
  handleSelect = (event, id) => {
    this.props.onSelect(id);
  };

  /**
   * Event handler for page changes
   * @param page
   */
  handleChangePage = (page) => {
    this.props.onChangePage(page);
  };

  /**
   * Event handler for row per page changes
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
      multiSelect,
      idProperty,
      order,
      orderBy,
      page,
      rowsPerPage
    } = this.props;

    return (
      <div className={ classes.root }>
        <Table className={ classes.table }>

          <DataGridTableHeader
            model={ model }
            order={ order }
            orderBy={ orderBy }
            multiSelect={ multiSelect }
            numSelected={ selectedIds.length }
            rowCount={ rows.length }
            onRequestSort={ this.handleRequestSort }
            onSelectAll={ this.handleSelectAll }
          />

          <DataGridTableBody
            model={ model }
            rowId={ idProperty }
            rows={ rows }
            selectedIds={ selectedIds }
            page={ page }
            rowsPerPage={ rowsPerPage }
            onSelect={ this.handleSelect }
          />

          <DataGridTableFooter
            count={ rows.length }
            rowsPerPage={ rowsPerPage }
            page={ page }
            onChangePage={ this.handleChangePage }
            onChangeRowsPerPage={ this.handleChangeRowsPerPage }
          />

        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(DataGridTable);
