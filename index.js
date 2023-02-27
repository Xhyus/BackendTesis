const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const itemRoutes = require('./routes/itemRoutes');
const contactRoutes = require('./routes/contactRoutes');
const companyRoutes = require('./routes/companyRoutes');
const signedRoutes = require('./routes/signedRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

const app = express()
app.use(cors({ credentials: true, origin: process.env.FRONTEND }));
app.use(express.json())
app.options('*', cors())
app.use('/api', userRoutes);
app.use('/api', serviceRoutes);
app.use('/api', itemRoutes);
app.use('/api', contactRoutes);
app.use('/api', companyRoutes);
app.use('/api', signedRoutes);
app.use('/api', quoteRoutes);
app.use('/assets', express.static(path.join(__dirname, '/assets')))

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