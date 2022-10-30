const express = require('express');
const api = express.Router();
const SignedController = require('../controllers/signedController');
const auth = require('../middleware/auth');

api.post('/signed', auth.auth, SignedController.createSigned);
api.get('/signed', auth.auth, SignedController.getSigned);
api.get('/signed/search/:id', SignedController.getSignedPage);
api.get('/sign/page/:id', SignedController.signedPage);

module.exports = api;