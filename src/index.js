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

/**
 * Module dependencies
 */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from '../src/modules/state/store'
//import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

//registerServiceWorker();