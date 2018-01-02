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
import SignUpForm from '../components/forms/signup'

// Map state to props
const mapStateToProps = (state) => ({
  user: state.user,
});


const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  }
};


// Bind state and dispatch action to component.
const SignUpPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm);

export default SignUpPage;
