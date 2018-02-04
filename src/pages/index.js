/**
 * Description
 *
 * IndexPage component renders the application header (header component)
 * and we map the redux store and pass the user object as props
 * to be able to display information about the current user
 *
 *
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @link:
 * @copyright:  Copyright (c) 2017 HGC AB
 *
 * @license: The MIT License (MIT)
 * @link: https://opensource.org/licenses/MIT
 */

import React from 'react';
import { connect } from 'react-redux'
import Header from '../components/header'

// Function that map the user branch of the global state to a user props
const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth,
});

// Inject Redux state to the header component
const HeaderComponent = connect(mapStateToProps)(Header);

/**
 * IndexPage component
 * @returns {*}
 * @constructor
 */
const IndexPage = () => (
  <HeaderComponent/>
);

export default IndexPage;

