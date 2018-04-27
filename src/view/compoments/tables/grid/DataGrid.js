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
import Paper from "material-ui/Paper";
import Grid from 'material-ui/Grid';
import { LinearProgress } from "material-ui/Progress";

// custom components
import DataGridToolbar from "./DataGridToolbar";
import DataGridTable from './DataGridTable';
import DataGridForm from "./DataGridForm";

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  progressItem: {
    order: 0,
  },
  tableItem: {
    order: 3,
  },
  formItem: {
    order: 2,
    [theme.breakpoints.up("sm")]: {
      order: 3,
    }
  },
  progress: {
    height: "5px"
  },
});

/**
 * DataGrid component
 */
class DataGrid extends React.Component {
  /**
   * Prop types API
   */
  static propTypes = {
    /**
     * Classes property to customize the style
     */
    classes: PropTypes.object.isRequired,

    /**
     * Array of data objects matching the model data for the columns
     */
    rows: PropTypes.array,

    /**
     * Should spinner be displayed
     */
    displaySpinner: PropTypes.bool,

    /**
     * Model data for columns in the table and the form
     */
    defaultModel: PropTypes.array.isRequired,

    /**
     * Can be used to override identifier prop name in supplied rows
     * Default is '_id'
     */
    defaultRowId: PropTypes.string,

    /**
     * Can be used to override the default sort order
     * Default is ascending
     */
    defaultOrder: PropTypes.string,

    /**
     * Can be used to specify which column should be sorted
     */
    defaultOrderBy: PropTypes.string,

    /**
     * Number of rows per page
     */
    defaultRowsPerPage: PropTypes.number,

    /**
     *
     */
    defaultRowsPerPageOptions: PropTypes.array,

    /**
     * Current page
     */
    defaultPage: PropTypes.number,

    /**
     * Create method
     */
    create: PropTypes.func,

    /**
     * Update method a single row
     */
    updateById: PropTypes.func,

    /**
     * Delete method
     */
    deleteById: PropTypes.func,

    /**
     * Update multiple rows with same data, exclude elements with prop unique
     */
    updateByIds: PropTypes.func,
  };

  /**
   * Initial states
   */
  state = {
    isUpdating: false,
    order: this.props.defaultOrder || 'desc',
    orderBy: this.props.defaultOrderBy || '',
    rowsPerPage: this.props.defaultRowsPerPage || 15,
    rowsPerPageOptions: this.props.defaultRowsPerPageOptions || [5, 15, 30],
    page: this.props.defaultPage || 0,
    rowId: this.props.defaultRowId || "_id",
    model: this.props.defaultModel || {},
    selectedIds: [],
    selectedData: {},
    rows: [],
  };

  /**
   * Ensure rows will be stored in local state.
   * We are also sorting the array passed in, e.g before we updating the state.
   * @param nextProps
   * @param prevState
   * @returns {*}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.rows && (nextProps.rows !== prevState.rows)) {
      const orderBy = prevState.orderBy;
      const order = prevState.order;
      const sortedRows =
        order === "desc"
          ? nextProps.rows.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
          : nextProps.rows.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

      return {
        rows: sortedRows,
        isUpdating: false,
      };
    }

    return null;
  }

  /**
   * Event handling for sort request
   * @param property
   */
  handleRequestSort = property  => {
    const { rows } = this.state;
    const orderBy = property;
    let order = "desc";

    // If toggle
    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const sortedRows =
      order === "desc"
        ? rows.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : rows.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ order, orderBy, rows: sortedRows });
  };

  /**
   * Event handling for select all rows
   * @param checked
   */
  handleSelectAll = checked => {
    const { rows, rowId } = this.state;

    if (checked) {
      this.setState({
        selectedIds: rows.map(row => row[rowId]),
        selectedData: rows[0]
      });
    } else {
      this.setState({ selectedIds: [], selectedData: {} });
    }
  };

  /**
   * Event handler for selection of a row
   * @param id
   */
  handleSelect = id => {
    const { selectedIds, rows, rowId } = this.state;
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selectedIds: newSelectedIds,
      selectedData: Object.assign({}, ...rows.filter(row => row[rowId] === newSelectedIds[0]))
    });
  };

  /**
   * Clear all selection made and set isUpdating
   */
  handleUpdating = () => {
    this.setState({ selectedIds: [], selectedData: {}, isUpdating: true });
  };

  /**
   * Event handler for page changes
   * @param page
   */
  handleChangePage = page => {
    this.setState({ page });
  };

  /**
   * Event handler for row per page changes
   * @param value
   */
  handleChangeRowsPerPage = value => {
    this.setState({ rowsPerPage: value });
  };

  /**
   *
   * @param checked
   */
  handleVisibleColumns = checked => {
    const { model } = this.state;
    let newModel = [];

    model.forEach(entry => {
      let obj = Object.assign({}, entry);
      obj.visible = false;
      checked.forEach(c => {
        if (c === obj.id) {
          obj.visible = true;
        }
      });
      newModel.push(obj);
    });

    this.setState({ model:newModel })
  };

  /**
   * Event handler for creating a new row
   * @param data
   */
  handleCreate = data => {
    if (this.props.create) {
      this.props.create(data);
    }
    this.handleUpdating();
  };

  /**
   * Event handler for update a single row
   * @param id
   * @param data
   */
  handleUpdateById = (id, data) => {
    if (this.props.updateById) {
      this.props.updateById(id, data);
    }
    this.handleUpdating();
  };

  /**
   * Event handler for delete one row
   * @param id
   */
  handleDeleteById = id => {
    if (this.props.deleteById) {
      this.props.deleteById(id);
    }
    this.handleUpdating();
  };

  /**
   * Event handler for updating multi selected rows
   * @param ids
   * @param data
   */
  handleUpdatesByIds = (ids, data) => {
    if (this.props.updateByIds) {
      this.props.updateByIds(ids, data);
    }
    this.handleUpdating();
  };

  render() {
    const { classes } = this.props;
    const {
      isUpdating,
      model,
      rows,
      rowId,
      order,
      orderBy,
      selectedIds,
      selectedData,
      rowsPerPage,
      page
    } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>

          <Grid className={classes.progressItem} item xs={12}>
            <Paper className={classes.paper}>
              <div className={classes.progress}>
                {isUpdating ? <LinearProgress color="secondary" /> : null}
              </div>
            </Paper>
          </Grid>

          <Grid className={classes.tableItem} item xs={12} sm={7}>
            <Paper className={classes.paper}>
              <DataGridToolbar
                model={model}
                onChangedColumns={this.handleVisibleColumns}
              />
              <DataGridTable
                model={model}
                rowId={rowId}
                rows={rows}
                selectedIds={selectedIds}
                order={order}
                orderBy={orderBy}
                rowsPerPage={rowsPerPage}
                page={page}
                onRequestSort={this.handleRequestSort}
                onSelectAll={this.handleSelectAll}
                onSelect={this.handleSelect}
                onChangePage={this.handleChangePage}
                onChangeRowPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>

          <Grid className={classes.formItem} item xs={12} sm={5}>
            <Paper className={classes.paper}>
              <DataGridForm
                model={model}
                formData={selectedData}
                selectedIds={selectedIds}
                create={this.handleCreate}
                updateById={this.handleUpdateById}
                deleteById={this.handleDeleteById}
                updateByIds={this.handleUpdatesByIds}
              />
            </Paper>
          </Grid>

        </Grid>

      </div>
    );
  }
}

export default withStyles(styles)(DataGrid);
