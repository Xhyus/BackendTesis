const express = require('express');
const api = express.Router();
const contactController = require('../controllers/contactController');

api.post('/contact/:id', contactController.createContact);
api.get('/contacts', contactController.getContacts);
api.get('/contact/search/:id', contactController.getSpecificContact);
api.put('/contact/update/:id', contactController.updateContact);
api.delete('/contact/delete/:id', contactController.deleteContact);

module.exports = api;