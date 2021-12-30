/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const history = require('connect-history-api-fallback')
const favicon = require('serve-favicon')

const app = express()
app.use(history())
app.use(express.static(__dirname + '/dist'))
app.use(favicon(__dirname + '/src/favicon.svg'))
const port = process.env.PORT || 8080
app.listen(port)
console.log('server started :' + port)
