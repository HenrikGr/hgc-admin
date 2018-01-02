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
import LoginForm from '../components/forms/login'

// Map state to props
const mapStateToProps = (state) => ({
  userId: state.userId,
});


const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (user) => {
      dispatch(setUser(user));
    }
  }
};


// Bind state and dispatch action to component.
const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default LoginPage;
