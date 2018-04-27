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
import { TableFooter, TablePagination, TableRow } from "material-ui/Table";

/**
 * DataGridTableFooter component
 */
class DataGridTableFooter extends React.Component {

  /**
   * Prop types API
   */
  static propTypes = {

    /**
     * Count of number of rows
     */
    count: PropTypes.number.isRequired,

    /**
     * Current page
     */
    page: PropTypes.number,

    /**
     * Number of rows per page
     */
    rowsPerPage: PropTypes.number,

    /**
     * Rows per page options
     */
    rowsPerPageOptions: PropTypes.array,

    onChangePage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
  };

  /**
   * Default props value
   */
  static defaultProps = {
    rowsPerPage: 15,
    rowsPerPageOptions: [5, 15, 30]
  };

  /**
   * Handle page changes
   * @param event
   * @param page
   */
  handleChangePage = (event, page) => {
    this.props.onChangePage(page);
  };

  /**
   * Handle row per page changes
   * @param event
   */
  handleChangeRowsPerPage = event => {
    this.props.onChangeRowsPerPage(event.target.value);
  };

  render() {
    const { count, page, rowsPerPage, rowsPerPageOptions } = this.props;

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            count={count}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            page={page}
            backIconButtonProps={{ "aria-label": "Previous Page" }}
            nextIconButtonProps={{ "aria-label": "Next Page" }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

export default DataGridTableFooter;
