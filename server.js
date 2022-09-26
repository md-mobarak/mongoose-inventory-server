const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = require('./app')

// database connect 
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log('database connect is successfully');
})


// server 
const port = 5000;


app.listen(port, () => {
    console.log(`app is running port ${port}`);
})