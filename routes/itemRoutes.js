const express = require('express');
const api = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

api.post('/item/:id', auth.auth, itemController.createItem);
api.get('/items', itemController.getItems);
api.get('/item/search/:id', auth.auth, itemController.getItem);
api.put('/item/update/:id', auth.auth, itemController.updateItem);
api.delete('/item/delete/:id', auth.auth, itemController.deleteItem);

module.exports = api;