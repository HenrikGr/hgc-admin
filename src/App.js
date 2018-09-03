/**
 * Description: App component
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import React from 'react'
import PropTypes from 'prop-types'

// React router
import { BrowserRouter as Router } from "react-router-dom";

// Redux store provider
import { Provider } from 'react-redux'

// material ui theme higher order component
import withTheme from './view/theme/withTheme';

// Application layout
import AppLayout from './view/layout/AppLayout'

/**
 * App component that provides the global store
 * @param {Object} store - redux global store
 * @constructor
 * @public
 */
const App = ({ store }) => (
  <Provider store={ store }>
    <Router>
      <AppLayout/>
    </Router>
  </Provider>
);

/**
 * Property type check
 * @type {Object}
 * @private
 */
App.propTypes = {
  /**
   * redux store
   * @type {Object}
   */
  store: PropTypes.object.isRequired
};

// Inject material-ui theme
export default withTheme(App);