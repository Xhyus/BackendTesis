const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.options('*', cors())
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);
app.use('/api', itemRoutes);

const options = {
    useNewUrlParser: true,
    autoIndex: true,
    keepAlive: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB, options, (error) => {
    if (error) {
        return console.log(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

module.exports = app;