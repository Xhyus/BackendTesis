const express = require('express');
const api = express.Router();
const quotesController = require('../controllers/quotesController');
const auth = require('../middleware/auth');

api.post('/quote', auth.auth, quotesController.createQuote);
// api.get('/quotes', auth.auth, quotesController.getQuotes);
// api.get('/quote/:id', auth.auth, quotesController.getQuote);
// api.put('/quote/:id', auth.auth, quotesController.updateQuote);
// api.delete('/quote/:id', auth.auth, quotesController.deleteQuote);
api.get('/quotes/search/company/:id', auth.auth, quotesController.getQuotesByCompany);

module.exports = api;