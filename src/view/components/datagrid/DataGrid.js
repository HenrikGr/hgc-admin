/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react
import React from 'react'
import PropTypes from 'prop-types'

// custom components
import DataGridToolbar from './toolbar/DataGridToolbar'
import DataGridTable from './table/DataGridTable'

/**
 * DataGrid component
 */
class DataGrid extends React.Component {
  /**
   * Prop types API
   */
  static propTypes = {
    /**
     * Allow multi selection
     */
    multiSelect: PropTypes.bool.isRequired,
    /**
     * Default object based on JSON Schema
     */
    defaultItem: PropTypes.object.isRequired,
    /**
     * Model data for columns in the table and the form
     */
    model: PropTypes.array.isRequired,
    /**
     * Array of data objects matching the model data for the columns
     */
    rows: PropTypes.array.isRequired,
    /**
     * Create method
     */
    onCreate: PropTypes.func.isRequired,
    /**
     * Update method a single row
     */
    onUpdate: PropTypes.func.isRequired,
    /**
     * Delete method
     */
    onRemove: PropTypes.func.isRequired,
    /**
     * Can be used to override identifier prop name in supplied rows
     * Default is '_id'
     * @ignore
     */
    idProperty: PropTypes.string
  }

  /**
   * Default props
   */
  static defaultProps = {
    idProperty: '_id',
    multiSelect: false
  }

  /**
   * Initial state
   */
  state = {
    order: 'asc',
    orderBy: '',
    rowsPerPage: 15,
    rowsPerPageOptions: [5, 15, 30],
    page: 0,

    model: this.props.model,
    selectedIds: [],
    selectedData: this.props.defaultItem
  }

  /**
   * Event handler for changing visible columns
   * @param checked
   */
  handleVisibleColumns = checked => {
    const { model } = this.state
    let newModel = []

    model.forEach(entry => {
      // Clone every entry and set visible prop to false
      let obj = Object.assign({}, entry)
      obj.visible = false

      // Check the checked array id name match entry id then set visible to true
      checked.forEach(c => {
        if (c === obj.id) {
          obj.visible = true
        }
      })

      // Add the cloned entry to the new model array
      newModel.push(obj)
    })

    this.setState({ model: newModel })
  }

  /**
   * Event handling for sort request
   * @param property
   */
  handleRequestSort = property => {
    const orderBy = property
    let order = 'desc'

    // If toggle sort order
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    if (order === 'desc') {
      this.props.rows.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    } else {
      this.props.rows.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1))
    }

    this.setState({ order, orderBy })
  }

  /**
   * Event handling for select all rows
   * @param checked
   */
  handleSelectAll = checked => {
    if (checked) {
      this.setState({
        selectedIds: this.props.rows.map(row => row[this.props.idProperty]),
        selectedData: this.props.rows[0]
      })
    } else {
      this.setState({
        selectedIds: [],
        selectedData: this.props.defaultItem
      })
    }
  }

  /**
   * Handle multiple selection
   * @param id
   */
  handleMultiSelect = id => {
    const { selectedIds } = this.state
    const { rows, idProperty, defaultItem } = this.props
    const selectedIndex = selectedIds.indexOf(id)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id)
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1))
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      )
    }

    // If no selection - normalize empty object based on current model
    // If selected - filter out the first entry from rows
    const data =
      newSelectedIds.length === 0
        ? defaultItem
        : Object.assign({}, ...rows.filter(row => row[idProperty] === newSelectedIds[0]))

    this.setState({
      selectedIds: newSelectedIds,
      selectedData: data
    })
  }

  /**
   * Handle single selection
   * @param id
   */
  handleSingleSelect = id => {
    const { selectedIds } = this.state
    const { rows, idProperty, defaultItem } = this.props
    const selectedIndex = selectedIds.indexOf(id)
    let newSelectedIds = []

    if (selectedIndex === -1) {
      newSelectedIds.push(id)
    }

    // If no selection - normalize empty object based on current model
    // If selected - filter out the first entry from rows
    const data =
      newSelectedIds.length === 0
        ? defaultItem
        : Object.assign({}, ...rows.filter(row => row[idProperty] === newSelectedIds[0]))

    this.setState({
      selectedIds: newSelectedIds,
      selectedData: data
    })
  }

  /**
   * Event handler for selection of a row
   * @param id
   */
  handleSelect = id => {
    if (this.state.multiSelect) {
      this.handleMultiSelect(id)
    } else {
      this.handleSingleSelect(id)
    }
  }

  /**
   * Event handler for page changes
   * @param page
   */
  handleChangePage = page => {
    this.setState({ page })
  }

  /**
   * Event handler for row per page changes
   * @param rowsPerPage
   */
  handleChangeRowsPerPage = rowsPerPage => {
    this.setState({ rowsPerPage })
  }

  /**
   * Event handler for create method
   */
  handleCreate = () => {
    const { selectedData } = this.state
    this.props.onCreate(selectedData)
  }

  /**
   * Event handler for update by id method
   */
  handleUpdate = () => {
    const { selectedData } = this.state
    const { idProperty } = this.props
    this.props.onUpdate(selectedData[idProperty], selectedData)
  }

  /**
   * Event handler for delete by id method
   */
  handleRemove = () => {
    const { idProperty, defaultItem } = this.props
    this.setState(state => {
      this.props.onRemove(state.selectedData[idProperty])
      return { ...state, selectedIds: [], selectedData: defaultItem }
    })
  }

  /**
   * Event handler for input changes in DataGridForm
   * @param prop
   * @param value
   */
  handleChange = (prop, value) => {
    let selectedData = { ...this.state.selectedData }
    selectedData[prop] = value

    this.setState({ selectedData })
  }

  render() {
    const { rows, idProperty, multiSelect } = this.props

    const {
      model,
      order,
      orderBy,
      selectedIds,
      //selectedData,
      rowsPerPage,
      page
    } = this.state

    return (
      <React.Fragment>

        <DataGridToolbar
          title="Users"
          numSelected={selectedIds.length}
          model={model}
          onCreate={this.handleCreate}
          onUpdate={this.handleUpdate}
          onDelete={this.handleRemove}
          onChangedColumns={this.handleVisibleColumns}
        />

        <DataGridTable
          model={model}
          idProperty={idProperty}
          rows={rows}
          multiSelect={multiSelect}
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

      </React.Fragment>
    )
  }
}

export default DataGrid
