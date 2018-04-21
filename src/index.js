/**
 * Description: Entry point for the application
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Module dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store/index'

// Application root
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

//registerServiceWorker();