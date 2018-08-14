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
import store from './store/index'
import Root from './view/theme/Root';
//import registerServiceWorker from './registerServiceWorker';


render(
  <Root store={store} />,
  document.getElementById('root')
);

//registerServiceWorker();