const express = require('express');
const api = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

api.post('/create-user', userController.createUser);
api.get('/get-users', auth.auth, userController.getUsers);
api.get('/get-user/:id', userController.getUser);
api.put('/update-user/:id', userController.updateUser);
api.delete('/delete-user/:id', userController.deleteUser);
api.put('/update-password/:id', userController.updatePassword);
api.post('/login', userController.login);

module.exports = api;