/**
 * @prettier
 * @description: Application entry point
 * @copyright (c) 2018 - present, HGC AB.
 * @licence This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//import './polyfills'
import './index.css'
import React from 'react'
import { render } from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

/**
 * Render the App
 */
render(<App />, document.getElementById('root'))

/**
 * If you want your app to work offline and load faster, you can change unregister() to register() below
 * Note this comes with some pitfalls. Learn more about xhr workers: http://bit.ly/2vJdu84
 */
serviceWorker.unregister();
