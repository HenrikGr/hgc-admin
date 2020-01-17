/**
 * @prettier
 * @description: Server serving web app
 * @author:   Henrik Grönvall
 * @version:  0.0.1
 * @copyright:  Copyright (c) 2017 HGC AB
 * @license: The MIT License (MIT)
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

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.info('server starting on ' + appEnv.url)
})
