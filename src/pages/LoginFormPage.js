/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Redux & app components
import { connect } from "react-redux";
import LoginForm from "../components/forms/LoginForm";

// Session action creators
import { getAccessToken } from "../modules/state/actions/session";

// Map session state to props
const mapStateToProps = state => ({
  session: state.session
});

// Map session action creators to props
const mapDispatchToProps = dispatch => {
  return {
    Login: (username, password) => {
      dispatch(getAccessToken(username, password));
    }
  };
};

// Inject state and action creators
const LoginFormPage = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

// Export the page
export default LoginFormPage;
