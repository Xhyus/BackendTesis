const express = require('express');
const api = express.Router();
const quotesController = require('../controllers/quotesController');
const auth = require('../middleware/auth');

api.post('/quote', auth.auth, quotesController.createQuote);

module.exports = api;