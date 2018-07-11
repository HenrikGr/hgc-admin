/**
 * Description: Module containing action creators for the users state.
 *
 * The users actions consist of remote CRUD operations to retrieve users
 * information to the state.
 *
 * There is also helpers action creators that describe the new state that should be set
 * during the remote calls in case of start, success or failure.
 *
 * The remote calls using users service module that contains business logic
 * for users information.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import userService from "../../domain/service/User";

/**
 * Helper action creator to be used when there is a user validation error
 * @param error
 * @returns {{type: string, error: *}}
 */
const validationFailed = error => ({
  type: "USER_VALIDATION_FAILED",
  error
});

/**
 * Helper action creator to be used when starting remote call getUsers
 * @param isFetching
 * @returns {{type: string, isFetching: *}}
 */
const fetchStart = (isFetching) => ({
  type: "FETCH_USERS_STARTED",
  isFetching
});

/**
 * Helper action creator to be used when remote call getUsers fails
 * @param error
 * @returns {{type: string, error: *}}
 */
const fetchFailed = error => ({
  type: "FETCH_USERS_FAILED",
  error
});

const getUsersComplete = users => ({
  type: "GET_USERS_COMPLETE",
  users
});

const createUserComplete = user => ({
  type: "CREATE_USER_COMPLETE",
  user
});

const updateUserComplete = user => ({
  type: "UPDATE_USER_COMPLETE",
  user
});

const deleteUserComplete = id => ({
  type: "DELETE_USER_COMPLETE",
  id
});

const updateUsersComplete = users => ({
  type: "UPDATE_USERS_COMPLETE",
  users
});

const resetError = () => ({
  type: "RESET_ERROR"
});


/**
 * Action creator - fetching users information
 * @param params
 * @returns {Function}
 */
const getUsers = params => {
  return function(dispatch, getState) {
    dispatch(fetchStart(true));
    userService.getUsers(params)
      .then(json => {
        dispatch(getUsersComplete(json));
      })
      .catch(json => {
        dispatch(fetchFailed(json));
      });
  };
};

/**
 * Action creator - create user
 * @param user
 */
const createUser = user => {
  return function(dispatch) {
    const error = userService.validateUser(user);
    if (error.message) {
      dispatch(validationFailed(error));
    } else {
      dispatch(fetchStart(true));
      userService.createUser(user)
        .then(json => {
          dispatch(createUserComplete(json));
        })
        .catch(err => {
          dispatch(fetchFailed(err));
        })
    }
  }
};

/**
 * Action creator - updating user
 * @param id
 * @param user
 * @returns {Function}
 */
const updateUserById = (id, user) => {
  return function(dispatch, getState) {
    const error = userService.validateUser(user);
    if (error.message) {
      dispatch(validationFailed(error));
    } else {
      dispatch(fetchStart(true));
      userService.updateUserById(id, user)
        .then(json => {
          dispatch(updateUserComplete(json));
        })
        .catch(err => {
          dispatch(fetchFailed(err));
        })
    }
  }
};

/**
 * Action creator - updating user
 * @param id
 * @returns {Function}
 */
const deleteUserById = id => {
  return function(dispatch) {
    dispatch(fetchStart(true));
    userService.deleteUserById(id)
      .then(() => {
        dispatch(deleteUserComplete(id));
      })
      .catch(err => {
        dispatch(fetchFailed(err));
      })
  }
};

/**
 * Action creator - updating users
 * @param ids
 * @param user
 * @returns {Function}
 */
const updateUsersByIds = (ids, user) => {
  return function(dispatch, getState) {
    dispatch(fetchStart(true));
    userService.updateUsersByIds(ids, user)
      .then(json => {
        dispatch(updateUsersComplete(json));
      })
      .catch(err => {
        dispatch(fetchFailed(err));
      })
  }
};


export const UsersActionFactory = (() => {
  return {
    getUsers,
    createUser,
    updateUserById,
    deleteUserById,
    updateUsersByIds,
    resetError,
  }
});

export default UsersActionFactory();

