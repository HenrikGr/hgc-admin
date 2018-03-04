/**
 * Description: IndexPage component
 *
 * The component is connected to the session in the global state
 * and we are using render props to wrap the Header component and
 * pass session information into it.
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & Redux
import React from 'react';
import { connect } from 'react-redux'

// App components
import Header from '../components/header'

// Session component and action creators to handle the session
import Session from '../components/session'
import { removeSession, refreshSession } from "../modules/state/actions/session";

// Map session state to props
const mapStateToProps = (state) => {
  return {
    session: state.session,
  }
};

// Map session action creators as props
const mapDispatchToProps = (dispatch) => {
  return {
    removeSession: () => {
      dispatch(removeSession())
    },
    refreshSession: () => {
      dispatch(refreshSession())
    }
  }
};

// Inject state and action creators
const SessionComponent = connect(
  mapStateToProps, mapDispatchToProps)(Session);

/**
 * IndexPage component
 * @returns {*}
 * @constructor
 */
export default function IndexPage() {
  return(
    <SessionComponent
      render={ session => (<Header session={session}/>) }
    />
  )
}
