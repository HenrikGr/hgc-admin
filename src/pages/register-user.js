/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */
import { connect } from 'react-redux'
import { setUser } from "../modules/state/actions";
import RegisterUser from '../components/forms/register-user'

/**
 * Ensure the RegisterUser component has access to the user object
 * in Redux in order to update it after a successful registration
 * @param state
 * @returns {{user: *|userReducer|string}}
 */
const mapStateToProps = (state) => ({
  user: state.user,
});

/**
 * Ensure the RegisterUser component has an action to set the store
 * with an user object of the last registered user
 * @param dispatch
 * @returns {{setUser: function(*=)}}
 */
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  }
};

/**
 * Bind state and dispatch action to component.
 */
const RegisterUserPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterUser);

/**
 * Export RegisterUserPage
 */
export default RegisterUserPage;
