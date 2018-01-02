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
import React from 'react'
import { connect } from 'react-redux'

const AccountComponent = ({user}) => (
  <div>
    <h2>{user.name}</h2>
  </div>
);


// Map state to props
const mapStateToProps = (state) => ({
  user: state.user,
});


// Bind state and dispatch action to component.
const AccountPage = connect(
  mapStateToProps,
)(AccountComponent);



export default AccountPage;