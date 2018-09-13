/**
 * @prettier
 * @description: Entry point for the application
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */

// Must be first import statement in the app.
// import './utils/polyfills.js'
import React from 'react'
import { render } from 'react-dom'
import store from './store/index'
import App from './App'
// import registerServiceWorker from './registerServiceWorker';

/**
 * Render the App
 */
render(<App store={store} />, document.getElementById('root'))

// TODO: Implement the service worker to cache assets
//registerServiceWorker();
