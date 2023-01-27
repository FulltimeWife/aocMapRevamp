const express = require('express')
const dotenv = require ('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port || 5000

const app = express()
connectDB()

app.use(express.json())
app.use('/api/zone', require('./routes/zoneRoutes.js'))
app.use('/api/marker', require('./routes/mapMarkerRoutes.js'))
app.use('/api/user', require('./routes/userRoutes.js'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port} at ${new Date().toUTCString()}`))

