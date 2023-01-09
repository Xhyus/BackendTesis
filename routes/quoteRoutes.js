const express = require('express');
const api = express.Router();
const quotesController = require('../controllers/quotesController');
const auth = require('../middleware/auth');

api.post('/quote', auth.auth, quotesController.createQuote);
api.get('/quotes', auth.auth, quotesController.getQuotes);
api.get('/quotes/active', auth.auth, quotesController.getActiveQuotes);
api.get('/quote/search/:id', auth.auth, quotesController.getQuote);
api.put('/quote/delete/:id', auth.auth, quotesController.deleteQuote);
api.get('/quotes/search/company/:id', auth.auth, quotesController.getQuotesByCompany);
api.get('/quote/search/client/:url', quotesController.getClientQuote);

module.exports = api;