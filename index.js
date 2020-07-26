/**
 * @prettier
 * @copyright (c) 2020 - present, HGC-AB
 * @licence This source code is licensed under the MIT license described and found in the
 * LICENSE file in the root directory of this source tree.
 */
const express = require('express')
const helmet = require('helmet')
const cfenv = require('cfenv')
const appEnv = cfenv.getAppEnv()

// Create our Express application
const app = express()

// Use helmet
app.use(helmet())

// Serve static resources from build directory
app.use(express.static('./build'))

// Serve index.html on refresh page
app.get('/*', function(req, res) {
  res.sendFile('index.html', { root: 'build' })
})

// start socket-server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the socket-server starts listening
  console.info('server starting on ' + appEnv.port + ': ' + appEnv.url)
})
