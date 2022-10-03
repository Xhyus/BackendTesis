const express = require('express');
const api = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

api.post('/item', auth.auth, itemController.createItem);
api.get('/item', auth.auth, itemController.getItems);
api.get('/item/:id', auth.auth, itemController.getItem);
api.put('/item/:id', auth.auth, itemController.updateItem);
api.delete('/item/:id', auth.auth, itemController.deleteItem);

module.exports = api;