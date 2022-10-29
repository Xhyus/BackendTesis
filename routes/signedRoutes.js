const express = require('express');
const api = express.Router();
const SignedController = require('../controllers/signedController');
const auth = require('../middlewares/auth');

api.post('/signed', auth, SignedController.createSigned);
api.get('/signed', auth, SignedController.getSigned);
api.get('/signed/:id', SignedController.getSignedPage);

module.exports = api;