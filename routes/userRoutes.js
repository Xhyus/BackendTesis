const express = require('express');
const api = express.Router();
const userController = require('../controllers/userController');

api.post('/create-user', userController.createUser);
api.get('/get-users', userController.getUsers);
api.get('/get-user/:id', userController.getUser);
api.put('/update-user/:id', userController.updateUser);
api.delete('/delete-user/:id', userController.deleteUser);
api.put('/update-password/:id', userController.updatePassword);

module.exports = api;