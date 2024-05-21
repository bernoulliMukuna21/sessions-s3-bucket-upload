const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const apiRouter = require('./routes/app.routes')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1', apiRouter)

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  })
})

module.exports = app
