const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')

var mongoose = require('mongoose')
mongoose.connect(config.dbConnection)

const authRoutes = require('./routes/auth')
const movieRoutes = require('./routes/movie')

app.use(express.json())
app.use(cors())

app.use("/auth", authRoutes)
app.use("/movie", movieRoutes)

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})