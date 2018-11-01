/**
 * @prettier
 * @description: Entry point for the application
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
 */
//import './polyfills'
import './index.css'
import React from 'react'
import { render } from 'react-dom'
import store from './store/index'
import App from './App'
import * as serviceWorker from './serviceWorker'

/**
 * Render the App
 */
render(<App store={store} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/2vJdu84
serviceWorker.unregister();
