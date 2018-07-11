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
import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// material-ui
import { withStyles } from '@material-ui/core/styles';

// custom container
import DataGrid from '../components/datagrid/DataGrid';

// Action creators
import actions from '../../store/actions/UsersAction'

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: theme.palette.text.secondary,
    width: '100%',
    height: '100%',
  },
});

/**
 * Data model for the users data.
 */
const model = [
  { id: 'username', type: 'text', unique: true, required: true, visible: true, width: 200, disablePadding: false, label: 'User name' },
  { id: 'scope', type: 'text', required: true, visible: true, width: 200, disablePadding: false, label: 'Scope(s)' },
  { id: 'admin', type: 'checkbox', visible: true, width: 40, disablePadding: true, label: 'Admin' },
  { id: 'active', type: 'checkbox', visible: true, width: 40, disablePadding: true, label: 'Active' },
];

/**
 * UserPage component
 */
class UsersPage extends React.Component {
  /**
   * Props API
   */
  static propTypes = {
    /**
     * Classes, can be used to override css styles
     */
    classes: PropTypes.object.isRequired,
    /**
     * Data object schema
     */
    schema: PropTypes.object.isRequired,
    /**
     * Default data from schema
     */
    defaultItem: PropTypes.object.isRequired,
    /**
     * Data array
     */
    items: PropTypes.array.isRequired,
    /**
     * Loading indicator
     */
    isFetching: PropTypes.bool,
    /**
     * Error object
     */
    error: PropTypes.object,
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
    remove: PropTypes.func.isRequired,
    /**
     * Reset error in form
     */
    resetError: PropTypes.func.isRequired,
  };

  /**
   * Get data on mount but only if we have not already loaded them
   */
  componentDidMount() {
    this.props.find({page: 0, sort: 'username'});
  }

  render() {
    const {
      classes,
      defaultItem,
      items,
      isFetching,
      error,
      create,
      update,
      remove,
      resetError
    } = this.props;

    return (
      <div className={ classes.root }>
        <DataGrid
          defaultItem={ defaultItem }
          model={ model }
          isFetching={ isFetching }
          error={ error }
          rows={ items }
          onCreate={ create }
          onUpdate={ update }
          onRemove={ remove }
          onResetError={ resetError }
        />
      </div>
    );
  }
}

// Map state to props
const mapStateToProps = state => ({
  schema: state.users.schema,
  defaultItem: state.users.defaultUser,
  items: state.users.docs,
  isFetching: state.users.isFetching,
  error: state.users.error,
});

// Map action creators to props
const mapDispatchToProps = dispatch => {
  return {
    find: (qp) => {
      dispatch(actions.getUsers(qp));
    },
    create: (user) => {
      dispatch(actions.createUser(user));
    },
    update: (id, user) => {
      dispatch(actions.updateUserById(id, user));
    },
    remove: (id) => {
      dispatch(actions.deleteUserById(id));
    },
    resetError: () => {
      dispatch(actions.resetError());
    }
  };
};

// Inject state and action creators to presentation layer
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UsersPage));
