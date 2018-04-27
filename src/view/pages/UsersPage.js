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

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from "react-redux";

// custom container
import DataGrid from '../compoments/tables/grid/DataGrid';

// Action creators
import actions from '../../store/actions/UsersAction'
//import {isEmpty} from "../../utils/helper";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  progress: {
    flexGrow: 1,
    height: "5px"
  },
});

/**
 * Data model for the users data.
 */
const model = [
  { id: 'username', type: 'text', unique: true, visible: true, width: 200, disablePadding: true, label: 'User name' },
  { id: 'password', type: 'password', visible: false, width: 200, disablePadding: true, label: 'Password' },
  { id: 'scope', type: 'text', visible: true, width: 200, disablePadding: true, label: 'Scope(s)' },
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
     * Data object
     */
    users: PropTypes.object.isRequired,

    /**
     * Get all users
     */
    getUsers: PropTypes.func.isRequired,

    /**
     * Create a new user
     */
    createUser: PropTypes.func.isRequired,

    /**
     * Update user by id
     */
    updateUserById: PropTypes.func.isRequired,

    deleteUserById: PropTypes.func.isRequired,

    /**
     * Update users by id
     */
    updateUsersByIds: PropTypes.func.isRequired,
  };

  /**
   * Get all users
   */
  componentDidMount() {
    this.props.getUsers({page: 0, sort: 'username'});
  }

  render() {
    const {
      classes,
      users,
      createUser,
      updateUserById,
      deleteUserById,
      updateUsersByIds
    } = this.props;

    return (
      <div className={classes.root}>
        <DataGrid
          defaultOrderBy="username"
          defaultOrder="asc"
          defaultModel={model}
          rows={users.docs}
          create={createUser}
          updateById={updateUserById}
          deleteById={deleteUserById}
          updateByIds={updateUsersByIds}
        />
      </div>
    );
  }
}

// Map state to props
const mapStateToProps = state => ({
  users: state.users
});

// Map action creators to props
const mapDispatchToProps = dispatch => {
  return {
    getUsers: (qp) => {
      dispatch(actions.getUsers(qp));
    },
    createUser: (user) => {
      dispatch(actions.createUser(user));
    },
    updateUserById: (id, user) => {
      dispatch(actions.updateUserById(id, user));
    },
    deleteUserById: (id) => {
      dispatch(actions.deleteUserById(id));
    },
    updateUsersByIds: (ids, user) => {
      dispatch(actions.updateUsersByIds(ids, user))
    }
  };
};

// Inject state and action creators to presentation layer
const ConnectedUsersPage = connect(mapStateToProps, mapDispatchToProps)(UsersPage);


export default withStyles(styles)(ConnectedUsersPage);