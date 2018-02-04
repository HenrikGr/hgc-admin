/**
 * Description: The register client page aims to register new client applications
 * that should be able to being authorized to use resources such as REST API.
 *
 * The registration of a client should only be allowed by a user with admin
 * role and the user must be logged in, meaning this form should be protected
 * until the current user is authenticated and has the role admin.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */
import { connect } from 'react-redux'
import RegisterClient from '../components/forms/register-client'

/**
 *
 * @param state
 * @returns {{isAuth: *|boolean}}
 */
const mapStateToProps = (state) => ({
  user: state.user,
});

/**
 * Bind state to component prop
 */
const RegisterClientPage = connect(
  mapStateToProps,
)(RegisterClient);

/**
 * Export RegisterUserPage
 */
export default RegisterClientPage;
