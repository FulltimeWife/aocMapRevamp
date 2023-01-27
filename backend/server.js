const express = require('express')
const dotenv = require ('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.port || 5000

const app = express()

app.use(express.json())
app.use('/api/map', require('./routes/mapRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port} at ${new Date().toUTCString()}`))

