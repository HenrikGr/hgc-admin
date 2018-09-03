/**
 * Description: Entry point for the application
 *
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Polyfills
//import './utils/polyfills.js';

// Module dependencies
import React from 'react';
import { render } from 'react-dom';

// Redux store
import store from './store/index'

// Application
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

/**
 * Render the App
 */
render(
  <App store={store} />,
  document.getElementById('root')
);

//registerServiceWorker();