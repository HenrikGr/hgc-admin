/**
 * Description: Users page component
 *
 * The UsersPage container components supply users state trough props and a CRUD
 * functions to be used to manage application state and perform remote calls to the
 * database.
 *
 * The users page using the DataGrid custom component and pass the data, CRUD methods and a
 * column model of the data to be rendered in the DataGrid.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// react & redux
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Presentation Layer
import DataGrid from '../components/datagrid/DataGrid'

// Action creators
import actions from '../../store/actions/UserActions'

/**
 * Data model for the users data.
 */
const model = [
  {
    id: 'username',
    type: 'text',
    unique: true,
    required: true,
    visible: true,
    width: 200,
    disablePadding: false,
    label: 'Store name'
  },
  {
    id: 'scope',
    type: 'text',
    required: true,
    visible: true,
    width: 200,
    disablePadding: false,
    label: 'Scope(s)'
  },
  { id: 'admin', type: 'checkbox', visible: true, width: 40, disablePadding: true, label: 'Admin' },
  {
    id: 'active',
    type: 'checkbox',
    visible: true,
    width: 40,
    disablePadding: true,
    label: 'Active'
  }
]

/**
 * UserPage component
 */
class UsersPage extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Default data from schema
     */
    entity: PropTypes.object.isRequired,
    /**
     * Data array
     */
    items: PropTypes.array.isRequired,
    /**
     * Get all users
     */
    find: PropTypes.func.isRequired,
    /**
     * Create a new user
     */
    create: PropTypes.func.isRequired,
    /**
     * Update user by id
     */
    update: PropTypes.func.isRequired,
    /**
     * Delete user by id
     */
    remove: PropTypes.func.isRequired
  }

  /**
   * Get data on mount but only if we have not already loaded them
   */
  componentDidMount() {
    this.props.find({ page: 0, sort: 'username' })
  }

  render() {
    const { entity, items, create, update, remove } = this.props

    return (
      <DataGrid
        defaultItem={entity}
        model={model}
        rows={items}
        onCreate={create}
        onUpdate={update}
        onRemove={remove}
      />
    )
  }
}

// Map state to props
const mapStateToProps = state => ({
  entity: state.users.entity,
  items: state.users.entities,
  isFetching: state.isFetching
})

// Map action creators to props
const mapDispatchToProps = dispatch => {
  return {
    find: qp => {
      dispatch(actions.getUsers(qp))
    },
    create: user => {
      dispatch(actions.createUser(user))
    },
    update: (id, user) => {
      dispatch(actions.updateUserById(id, user))
    },
    remove: id => {
      dispatch(actions.deleteUserById(id))
    }
  }
}

// Inject state and action creators to presentation layer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage)
