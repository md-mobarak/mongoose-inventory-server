const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


// middleware
app.use(express.json())
app.use(cors())

// router 
const productRoute = require('./routes/product.route')

app.get('/', (req, res) => {
    res.send('Route is Working YaY...')
})

// posting to database
app.use('/api/v1/product', productRoute)



module.exports = app;