/**
 * Description:
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// material ui
import withRoot from './withRoot';

// Application layout
import AppLayout from '../layout/AppLayout'

/**
 * Root component
 * @param store
 * @returns {*}
 * @constructor
 */
const Root = ({ store }) => (
  <Provider store={ store }>
    <Router>
      <Route path="/" component={ AppLayout } />
    </Router>
  </Provider>
);

/**
 * Props API
 */
Root.propTypes = {
  store: PropTypes.object.isRequired
};

// Inject material-ui, themes, baseline, etc
export default withRoot(Root);