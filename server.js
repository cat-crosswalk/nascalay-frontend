/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const history = require('connect-history-api-fallback')
const favicon = require('serve-favicon')
const path = require('path')

const app = express()
app.use(history())
app.use(express.static(path.join(__dirname, '/dist')))
app.use(favicon(path.join(__dirname, '/src/favicon.svg')))
const port = process.env.PORT || 8080
app.listen(port)
console.log('server started :' + port)
