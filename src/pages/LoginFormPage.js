/**
 * Description: LoginFormPage
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Redux & app components
import { connect } from 'react-redux'
import LoginForm from '../components/forms/LoginForm'

// Session action creators
import { setSession } from "../modules/state/actions/session";

// Map session state to props
const mapStateToProps = (state) => ({
  session: state.session,
});

// Map session action creators to props
const mapDispatchToProps = (dispatch) => {
  return {
    setSession: (token) => {
      dispatch(setSession(token))
    }
  }
};

// Inject state and action creators into the LoginForm component
const LoginFormPage = connect(
  mapStateToProps,
  mapDispatchToProps)(LoginForm);

// Export the page
export default LoginFormPage;
