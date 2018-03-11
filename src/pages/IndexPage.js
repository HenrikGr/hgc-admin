/**
 * Description
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// React & Redux
import React from "react";
import { connect } from "react-redux";

// Header component
import Header from "../components/header";

// Map session state to props
const mapStateToProps = state => {
  return {
    session: state.session
  };
};

// Inject state and action creators
const HeaderWithSession = connect(mapStateToProps)(Header);

/**
 * IndexPage component
 * @returns {*}
 * @constructor
 */
export default function IndexPage() {
  return <HeaderWithSession />;
}
