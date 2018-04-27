/**
 * Description: Login page component
 *
 * The LoginPage container components supply session state trough props and a Login function
 * to be used to authenticate the credentials entered in the presentation layer.
 *
 * The session state supplied to the presentation layer can hold the following states;
 * - isFetching, when a remote authentication occur,
 * - error, if client validation or remote errors are received.
 * - session object containing an access_token, received from a successful Login.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Redux
import { connect } from "react-redux";

// Presentation layer
import LoginForm from "../compoments/forms/LoginForm";

// Action creators used to update session state
import sessionAction from '../../store/actions/SessionAction';

// Map session state to props
const mapStateToProps = state => ({
  session: state.session,
});

// Map action creators to props
const mapDispatchToProps = dispatch => {
  return {
    Login: (username, password) => {
      dispatch(sessionAction.getSession(username, password));
    }
  };
};

// Inject state and action creators to the presentation layer
const LoginFormPage = connect(
  mapStateToProps,
  mapDispatchToProps)(LoginForm);

// Export the container component
export default LoginFormPage;
