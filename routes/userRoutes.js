const express = require('express');
const api = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

api.post('/create-user', auth.auth, userController.createUser);
api.get('/get-users', auth.auth, userController.getUsers);
api.get('/get-user/:id', auth.auth, userController.getUser);
api.put('/update-user/:id', auth.auth, userController.updateUser);
api.delete('/delete-user/:id', auth.auth, userController.deleteUser);
api.put('/update-password/:id', auth.auth, userController.updatePassword);
api.post('/login', userController.login);
api.get('/checkToken', auth.auth, userController.checkToken);
api.get('/logout', auth.auth, userController.logout);

module.exports = api;