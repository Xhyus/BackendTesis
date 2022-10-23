const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const itemRoutes = require('./routes/itemRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express()
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json())
app.options('*', cors())
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);
app.use('/api', itemRoutes);
app.use('/api', contactRoutes);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB, (error) => {
    if (error) {
        return console.log(error)
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

module.exports = app;